const uuid = require('uuid/v1')
const redis = require('../../modules/redis')

const getUserStr = id => `USERS_${id}`

module.exports = {
  Query: {
    async user(parent, args, context, info) {
      const data = await redis.get(getUserStr(args.address))
      console.log('user', data)
      return JSON.parse(data)
    },
  },

  Mutation: {
    addUser: async (root, data, context) => {
      const item = { ...data }
      console.log('item', item)

      await redis.set(getUserStr(item.address), JSON.stringify(item))
      return item
    },

    updateUser: async (root, data, context) => {
      const item = { ...data }

      await redis.set(getUserStr(item.address), JSON.stringify(item))
      return item
    },

    addChannelToUser: async (root, data, context) => {
      const item = { ...data }
      const userRef = getUserStr(item.address)
      const res = await redis.get(userRef)
      const userData = JSON.parse(res)
      userData.channels = userData.channels || []
      userData.channels.push({ channel_id: item.channel_id })
      console.log('userData', userData)

      await redis.set(userRef, JSON.stringify(item))
      return userData
    },
  }
}
