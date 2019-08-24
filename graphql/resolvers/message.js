const uuid = require('uuid/v1')
const redis = require('../../modules/redis')

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
      return item
    },
  },
}
