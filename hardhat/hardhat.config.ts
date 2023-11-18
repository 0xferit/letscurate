import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";


const providerApiKey = process.env.ALCHEMY_API_KEY;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

const config : HardhatUserConfig = {
  solidity:{
    version: "0.8.19",
  },
  defaultNetwork: "localhost",
  namedAccounts:{
    deployer:{
      default: 0,
    }
  },
  networks:{
    hardhat: {
      live: false,
      saveDeployments: true,
      allowUnlimitedContractSize: true,
      tags: ["test", "local"],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      live: true,
      saveDeployments: true,
      tags: ["staging"],
    },
  },
  verify: {
    etherscan: {
      apiKey: `${etherscanApiKey}`,
    },
  },
  
}

export default config;