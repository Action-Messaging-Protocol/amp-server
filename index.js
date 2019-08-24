require('dotenv').config()
const express = require('express')
, path = require('path')
, { ApolloServer, gql } = require('apollo-server-express')
, { typeDefs } = require('./graphql/schema')
, { resolvers } = require('./graphql/resolvers')

// REDIS: Every node needs it to sync the queue
const sys = require('util')
const exec = require('child_process').exec

function puts(error, stdout, stderr) {
  if (error) console.log('redis error', error)
  sys.puts(stdout)
}

// start redis immediately, because we always need it, and dont like boot errors
exec('redis-cli shutdown')
exec('redis-server', puts)

const server = new ApolloServer({ typeDefs, resolvers });
const app = express()

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
