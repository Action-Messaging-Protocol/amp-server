module.exports = {
  Single: `
    "Generic Channel"
    type Channel {
      "UUID of channel, based on the dao contract address"
      address: String
      name: String
    }
  `,

  Query: `
    "Get single channel"
    channel(id: String!): Channel
  `,

  Mutation: `
    "add new Channel"
    addChannel(
      id: String!
    ): Channel

    "add new Channel"
    updateChannel(
      id: String!
    ): Channel

    "delete Channel"
    deleteChannel(
      id: String!
    ): Channel
  `
}
