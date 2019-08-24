const Messages = require('../../modules/messages')

module.exports = {
  Query: {
    messages() {
      return Messages.getAllById()
    },

    async message(parent, args) {
      // NOTE: Probably need channel id here
      return Messages.getById(args.id)
    },
  },

  Mutation: {
    addMessage: async (root, data, context) => {
      const item = { ...data }
      delete item.id

      const updateRes = await Messages.addMessage('channel_1234', item)
      return updateRes
    },
  },
}
