const { PubSub } = require('apollo-server-express')
const uuid = require('uuid/v1')
const redis = require('../../modules/redis')
const events = require('../../modules/events')
const pubsub = new PubSub()

const getChannelStr = id => `CHANNEL_${id}`

module.exports = {
  Query: {
    async channel(parent, args, context, info) {
      const data = await redis.get(getChannelStr(args.channel_id))
      console.log('channel', data)
      return JSON.parse(data)
    },
  },

  Mutation: {
    newChannel: async (root, data, context) => {
      const item = { ...data }
      item.channel_id = uuid()
      console.log('item', item)

      await redis.set(getChannelStr(item.channel_id), JSON.stringify(item))
      return item
    },

    updateChannel: async (root, data, context) => {
      const item = { ...data }

      await redis.set(getChannelStr(item.channel_id), JSON.stringify(item))
      return item
    },

    addUserToChannel: async (root, data, context) => {
      const item = { ...data }
      const res = await redis.get(getChannelStr(item.channel_id))
      const channelData = JSON.parse(res)
      channelData.users = channelData.users || []
      channelData.users.push({ address: item.user_address })
      console.log('channelData', channelData)

      await redis.set(getChannelStr(item.channel_id), JSON.stringify(item))
      return channelData
    },
  },

  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator([events.messageAdded]),
    },
  }
}
