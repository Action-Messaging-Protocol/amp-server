const { PubSub } = require('apollo-server-express')
const uuid = require('uuid/v1')
const redis = require('../../modules/redis')
const events = require('../../modules/events')
const push = require('../../modules/push')
const pubsub = new PubSub()

const getMessageStr = id => `MESSAGES_${id}`
const getChannelStr = id => `CHANNEL_${id}`
const getUserStr = id => `USERS_${id}`

module.exports = {
  Query: {
    async messages(parent, args) {
      const data = await redis.getAll(getMessageStr(args.channel_id))
      return data.map(m => JSON.parse(m))
    },

    async message(parent, args) {
      const data = await redis.get(getMessageStr(args.channel_id), args.id)
      return data
    },
  },

  Mutation: {
    addMessage: async (root, data, context) => {
      let push_devices = []
      const item = { ...data }
      item.id = uuid()
      item.timestamp = `${+new Date()}`

      // Get deets for relevant infos
      const channelRaw = await redis.get(getChannelStr(item.channel_id))
      const channelData = JSON.parse(channelRaw)

      if (channelData && channelData.users) {
        channelData.users.forEach(async u => {
          // loop users, get their data, get their device ID, then add to push
          // NOTE: Need to exclude sender
          const userRaw = await redis.get(getUserStr(u.address))
          const userData = JSON.parse(userRaw)
          const dids = userData && userData.device_ids ? JSON.parse(userData.device_ids) : null
          if (dids) push_devices = push_devices.concat()
        })
      }

      await redis.push(getMessageStr(item.channel_id), JSON.stringify(item))

      // sets up all needed push data
      const title = channelData && channelData.name || 'Chat Group'
      const message = item.payload && item.payload.body ? item.payload.body : 'New message!'
      const push_ids = push_devices.length > 0 ? push_devices : ['c1b155d0-02ce-44c8-9274-7fbbe982c931']
      console.log('push_ids', push_ids)

      // Send socket notifs
      pubsub.publish(events.messageAdded, { messageAdded: item })

      // Send device notifs
      await push.send({ title, message, push_ids })

      return item
    },
  },
}
