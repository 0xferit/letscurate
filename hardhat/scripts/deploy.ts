import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployLetsCurate: DeployFunction = async function ({deployments,getNamedAccounts}: HardhatRuntimeEnvironment) {

  const {deploy} = deployments;
  const {deployer} =await getNamedAccounts();


  console.log("Deploying the contract...")
  const contract = await deploy("LetsCurate",{
    from: deployer,
    log: true,
  })

  console.log("Contract has been deployed to: " + contract.address);
}

deployLetsCurate.tags = ["LetsCurate"];
export default deployLetsCurate;

