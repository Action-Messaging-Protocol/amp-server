const { Arc } = require('@daostack/client')

class SubgraphProvider {
  constructor() {
    // create an Arc instance
    this.arc = new Arc({
      //     graphqlHttpProvider: "https://subgraph.daostack.io/subgraphs/name/v23",
      // graphqlWsProvider: "wss://ws.subgraph.daostack.io/subgraphs/name/v23",
      graphqlHttpProvider: 'https://api.thegraph.com/subgraphs/name/ben-kaufman/daostack-alchemy',
      graphqlWsProvider: 'wss://api.thegraph.com/subgraphs/name/ben-kaufman/daostack-alchemy',
      web3Provider: `wss://mainnet.infura.io/ws/v3/${YOUR_TOKEN_HERE}`,
      ipfsProvider: {
        host: 'subgraph.daostack.io',
        port: '443',
        protocol: 'https',
        'api-path': '/ipfs/api/v0/'
      }
    })

    // get a list of DAOs
    this.arc.daos().subscribe(
      (daos) => console.log(`Here are your DAOS: ${daos}`)
    )

    return this
  }
}

module.exports = new SubgraphProvider()
