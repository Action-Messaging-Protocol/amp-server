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
        await channelData.users.forEach(async u => {
          if (u && u.address) {
            // loop users, get their data, get their device ID, then add to push
            // NOTE: Excludes sender
            // NOTE: this is ugly... argh
            const userRaw = await redis.get(getUserStr(u.address))
            const userData = userRaw ? JSON.parse(userRaw) : null
            if (userData && userData.address && userData.device_ids && userData.address !== item.user_address) {
              const didRaw = userData && userData.device_ids ? userData.device_ids : null
              const dids = didRaw && didRaw !== 'null' ? JSON.parse(didRaw) : null
              if (dids) push_devices = push_devices.concat(dids)
            }
          }
        })
      }

      await redis.push(getMessageStr(item.channel_id), JSON.stringify(item))

      // sets up all needed push data
      const msgRaw = typeof item.payload === 'string' && item.payload.length > 0 ? JSON.parse(item.payload) : null
      const message = channelData && channelData.name || 'Chat Group'
      const title = msgRaw && msgRaw.body ? msgRaw.body : 'New message!'
      const push_ids = push_devices.length > 0 ? push_devices : []

      // Send socket notifs
      pubsub.publish(events.messageAdded, { messageAdded: item })

      // Send device notifs
      if (push_ids.length > 0) await push.send({ title, message, push_ids })

      return item
    },
  },
}
