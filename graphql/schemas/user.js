module.exports = {
  Single: `
    "Generic User"
    type User {
      "address of User"
      address: String

      channels: [Channel]
    }
  `,

  Query: `
    "Get single User"
    user(address: String!): User

    "Get channels user is a part of"
    channels(address: String!): [Channel]
  `,

  Mutation: `
    "add new User"
    addUser(
      address: String!
    ): User

    "add new User"
    updateUser(
      address: String!
    ): User

    "Add new user to Channel"
    addChannelToUser(
      channel_id: String!
      address: String!
    ): User
  `
}
