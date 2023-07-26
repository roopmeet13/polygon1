// Import necessary packages and contracts
const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../abc/contractABIs");

//Transfer ERC721A tokens to the Ethereum FxChain networkconst hre = require("hardhat");
async function main() {
 
  const deployedAddress = "0xb37AaDBBf8ED18134155728eeC6cCFcd995b71BB"; //address of deployed contract
  const roop_meet = await ethers.getContractAt("Roop_meet", deployedAddress);
  const fxRoot = await ethers.getContractAt(
    FXRootContractAbi,
    "0xF9bc4a80464E48369303196645e876c8C7D972de"
  );

  const Roop_meet = await hre.ethers.getContractFactory("Roop_meet");
  const roop = await Roop_meet.attach(deployedAddress);
  console.log("Contract address:", roop.address);
  const signer = await ethers.getSigner();
  // Token IDs of the NFTs you want to send
  const tokenIds = [0, 1, 2, 3, 4];
  const wallet = "0x1Cec65C850D70615fA8aC4cbDEd7f3808C5E8FfC"; //Wallet address
 
  for (const tokenId of tokenIds) {
    let approveTxn = await roop_meet.approve(fxRoot.address, tokenId);
    await approveTxn.wait();
    console.log("Roop_meet NFT# " + tokenId + " approved");

    let txn = await fxRoot.deposit(
      roop_meet.address,
      signer.address,
      tokenId,
      "0x6566"
    );
    await txn.wait();
    console.log("Roop_meet NFT# " + tokenId + " deposited");
  }

  // Print the balance of the wallet
  const walletBalance = await hre.ethers.provider.getBalance(wallet);
  console.log("Balance of Mumbai is:", walletBalance.toString());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

