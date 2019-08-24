module.exports = {
  Single: `
    "Generic User"
    type User {
      "address of User"
      address: String
    }
  `,

  Query: `
    "Get single User"
    user(address: String!): User
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
  `
}
