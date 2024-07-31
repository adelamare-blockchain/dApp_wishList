// Librairies
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv/config");

// const { vars } = require("hardhat/config");

// get.env files
const {
  PRIVATE_KEY,
  LOCALHOST_URL,
  POLYGONSCAN_API_KEY,
  AMOY_URL,
  AMOY2_URL,
  AMOY3_URL,
  OKLINK_API_KEY,
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  paths: {
    artifacts: "../frontend/artifacts",
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: LOCALHOST_URL || "http://127.0.0.1:8545",
      chainId: 31337,
    },
    polygonAmoy: {
      url: AMOY_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
      chainId: 80002,
    },
    polygonAmoy2: {
      url: AMOY2_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
      chainId: 80002,
    },
    polygonAmoy3: {
      url: AMOY3_URL,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
      chainId: 80002,
    },
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      polygonAmoy: POLYGONSCAN_API_KEY || "",
      polygonAmoy2: POLYGONSCAN_API_KEY || "",
      polygonAmoy3: POLYGONSCAN_API_KEY || "",
    },
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: true,
    currency: "EUR",
    gasPrice: 21,
  },
};
