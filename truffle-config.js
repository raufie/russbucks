const HDWalletProvider = require("@truffle/hdwallet-provider")
require('dotenv').config()

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`)
      },
      network_id: 4,
      from:process.env.FROM_KEY
      
    }

  },
  compilers:{
    solc: { version:"0.8.0"}
  },
  plugins:['truffle-plugin-verify'],

  api_keys:{
    etherscan:process.env.ETHERSCAN_KEY
  }
}