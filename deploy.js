// deployNFTContract.js
const { ethers } = require("hardhat");

async function main() {
  const Nft = await ethers.getContractFactory("Roop_meet");
  const nft = await Nft.deploy();
  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
