// const SerialProvider = require('../../modules/serialProvider')

module.exports = {
  Query: {
    async user(parent, args, context, info) {
      // const res = await db.getItemById('Makers', args.id)
      // const motors = await Promise.all(res.motors.map(
      //   async id => await db.getItemById('Motors', id)
      // ))
      //
      // return {
      //   ...res,
      //   motors,
      // }
    },
  },

  Mutation: {
    addUser: async (root, data, context) => {
      // const item = { ...data }
      // delete item.id
      //
      // const updateRes = await db.updateItemById('Makers', data.id, item)
      // return updateRes
    },

    updateUser: async (root, data, context) => {
      // const item = { ...data }
      // delete item.id
      //
      // const updateRes = await db.updateItemById('Makers', data.id, item)
      // return updateRes
    },
  }
}
