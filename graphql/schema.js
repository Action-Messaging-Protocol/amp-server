const { gql } = require('apollo-server-express')
const channel = require('./schemas/channel')
const message = require('./schemas/message')
const user = require('./schemas/user')

const typeDefs = gql`
  ${channel.Single}
  ${message.Single}
  ${user.Single}

  type Query {
    ${channel.Query}
    ${message.Query}
    ${user.Query}
  }

  type Mutation {
    ${channel.Mutation}
    ${message.Mutation}
    ${user.Mutation}
  }

  type Subscription {
    ${channel.Subscription}
  }
`

module.exports = { typeDefs }
