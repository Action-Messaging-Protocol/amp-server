const channel = require('./resolvers/channel')
const message = require('./resolvers/message')
const user = require('./resolvers/user')

const resolvers = {
  Query: {
    ...(channel.Query ? channel.Query : null),
    ...(message.Query ? message.Query : null),
    ...(user.Query ? user.Query : null),
  },

  Mutation: {
    ...(channel.Mutation ? channel.Mutation : null),
    ...(message.Mutation ? message.Mutation : null),
    ...(user.Mutation ? user.Mutation : null),
  },

  Subscription: {
    ...(channel.Subscription ? channel.Subscription : null),
  },
}

module.exports = { resolvers }
