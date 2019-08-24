const { PubSub } = require('apollo-server-express')
const uuid = require('uuid/v1')
const redis = require('../../modules/redis')
const events = require('../../modules/events')
const push = require('../../modules/push')
const pubsub = new PubSub()

const getMessageStr = id => `MESSAGES_${id}`

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
      const item = { ...data }
      item.id = uuid()
      item.timestamp = `${+new Date()}`

      await redis.push(getMessageStr(item.channel_id), JSON.stringify(item))

      // TODO: Make these dynamic for reals
      const title = 'Daonuts - Group'
      const message = item.payload && item.payload.body ? item.payload.body : 'New message!'
      const push_ids = ['c1b155d0-02ce-44c8-9274-7fbbe982c931']

      // Send socket notifs
      pubsub.publish(events.messageAdded, { messageAdded: item })

      // Send device notifs
      await push.send({ title, message, push_ids })

      return item
    },
  },
}
