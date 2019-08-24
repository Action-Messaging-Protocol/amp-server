module.exports = {
  Single: `
    "Generic Channel"
    type Channel {
      "UUID of channel, based on the dao contract address"
      channel_id: String
      name: String
    }
  `,

  Query: `
    "Get single channel"
    channel(channel_id: String!): Channel
  `,

  Mutation: `
    "add new Channel"
    newChannel(
      name: String
    ): Channel

    "update a Channel"
    updateChannel(
      channel_id: String!
    ): Channel

    "Add new user to Channel"
    addUserToChannel(
      channel_id: String!
      user_address: String!
    ): Channel
  `,

  Subscription: `
    "Fires new message to channel"
    messageAdded: Message
  `
}
