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
    user(id: String!): User
  `,

  Mutation: `
    "add new User"
    addUser(
      id: String!
    ): User

    "add new User"
    updateUser(
      id: String!
    ): User
  `
}
