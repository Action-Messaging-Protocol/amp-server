const express = require('express')
const messagesController = require('./messagesController')

module.exports = express
  .Router()
  .get('/', (req, res) => {
    // generic node info, checking node current state/IDs
    // TODO: Return bootnode contracts
    res.json({
      app_id: "HASH_THIS__",
      app_name: "daostack",
      timestamp: "UTC_THING_YEP",
      // payload: {
      //   // JSON of data required to make actions or messages
      // },
      payload: { // simple message shits
        body: "This is sample message for @mark bro",
        variables: ['mark:Mark P'],
      },
      // payload: { // dao message example
      //   body: "New threshold on ETH price!",
      //   id: ID!
      //   dao: DAO!
      //   proposer: Bytes!
      //   stage: String!
      //   createdAt: BigInt!
      //   preBoostedAt: BigInt
      //   boostedAt: BigInt
      //   quietEndingPeriodBeganAt: BigInt
      //   executedAt: BigInt
      //   totalRepWhenExecuted: BigInt
      //   votingMachine: Bytes!
      //   executionState: String!
      //   paramsHash: Bytes!
      //   organizationId: Bytes!
      //   confidenceThreshold: BigInt!
      //   descriptionHash: String!
      //   title: String
      //   ...
      // },
      user: {
        address: "0x1321123k432jl423kl4jl2k",
      },
      channel: {
        name: "Bridgewater",
        address: "0x1321123k432jl423kl4jl2k"
      },
      permissions: [{ admin: true, address: "0x1321123k432jl423kl4jl2k" }],
      acknowledged: true
    })
  })
