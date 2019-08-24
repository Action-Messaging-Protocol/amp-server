const uuid = require('uuid/v1')
const redis = require('../../modules/redis')

module.exports = {
  Query: {
    async messages(parent, args) {
      const data = await redis.getAll(args.channel_id)
      return data.map(m => JSON.parse(m))
    },

    async message(parent, args) {
      const data = await redis.get(args.channel_id, args.id)
      return data
    },
  },

  Mutation: {
    addMessage: async (root, data, context) => {
      const item = { ...data }
      const channel_id = item.channel_id
      item.id = uuid()

      await redis.push(channel_id, JSON.stringify(item))
      return item
    },
  },
}
