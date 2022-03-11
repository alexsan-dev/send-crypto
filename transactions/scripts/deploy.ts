import { ethers } from "hardhat";

const main = async () => {
  const Transactions = await ethers.getContractFactory("Transactions");
  const transaction = await Transactions.deploy();
  await transaction.deployed();
  console.log("Transaction deployed to:", transaction.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
