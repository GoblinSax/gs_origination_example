require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: {
    compilers: [{
      version:  "0.8.9",
      settings: {
        evmVersion: "istanbul",
        optimizer: {
          enabled: true,
          runs: 1000,
        },
      },
    }, ],
  },
  networks: {
    hardhat: {
      chainId: 4,
      forking: {
        url: process.env.MACROHACKS_NODE_URL
      }
    }
  },
  mocha: {
    timeout: 100000000,
  },
};