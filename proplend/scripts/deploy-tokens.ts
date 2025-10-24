import { ethers } from 'hardhat';

/**
 * @title Token Deployment Script
 * @notice Deploys MockUSDC and tranche tokens (sSAFE, jYIELD)
 *
 * Deployment Order:
 * 1. MockUSDC (testnet USDC with unlimited minting)
 * 2. Senior Token (sSAFE)
 * 3. Junior Token (jYIELD)
 *
 * Usage:
 *   npx hardhat run scripts/deploy-tokens.ts --network amoy
 */
async function main() {
  console.log('\n🚀 Deploying PropertyLend Tokens to', network.name);
  console.log('================================================\n');

  const [deployer] = await ethers.getSigners();
  console.log('📍 Deployer address:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('💰 Deployer balance:', ethers.formatEther(balance), 'POL\n');

  // 1. Deploy MockUSDC
  console.log('1️⃣  Deploying MockUSDC...');
  const MockUSDC = await ethers.getContractFactory('MockUSDC');
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();

  const usdcAddress = await usdc.getAddress();
  console.log('✅ MockUSDC deployed to:', usdcAddress);

  // Verify USDC metadata
  const usdcName = await usdc.name();
  const usdcSymbol = await usdc.symbol();
  const usdcDecimals = await usdc.decimals();
  console.log(`   Name: ${usdcName}`);
  console.log(`   Symbol: ${usdcSymbol}`);
  console.log(`   Decimals: ${usdcDecimals}\n`);

  // 2. Deploy Senior Token (sSAFE)
  console.log('2️⃣  Deploying Senior Token (sSAFE)...');
  const TrancheToken = await ethers.getContractFactory('TrancheToken');
  const seniorToken = await TrancheToken.deploy('Senior SAFE Token', 'sSAFE', true);
  await seniorToken.waitForDeployment();

  const seniorAddress = await seniorToken.getAddress();
  console.log('✅ Senior Token deployed to:', seniorAddress);

  const seniorName = await seniorToken.name();
  const seniorSymbol = await seniorToken.symbol();
  console.log(`   Name: ${seniorName}`);
  console.log(`   Symbol: ${seniorSymbol}`);
  console.log(`   Tranche: Senior (8-10% APY, Low Risk)\n`);

  // 3. Deploy Junior Token (jYIELD)
  console.log('3️⃣  Deploying Junior Token (jYIELD)...');
  const juniorToken = await TrancheToken.deploy('Junior YIELD Token', 'jYIELD', false);
  await juniorToken.waitForDeployment();

  const juniorAddress = await juniorToken.getAddress();
  console.log('✅ Junior Token deployed to:', juniorAddress);

  const juniorName = await juniorToken.name();
  const juniorSymbol = await juniorToken.symbol();
  console.log(`   Name: ${juniorName}`);
  console.log(`   Symbol: ${juniorSymbol}`);
  console.log(`   Tranche: Junior (20-30% APY, Medium-High Risk)\n`);

  // Summary
  console.log('================================================');
  console.log('📋 DEPLOYMENT SUMMARY');
  console.log('================================================');
  console.log(`MockUSDC:      ${usdcAddress}`);
  console.log(`Senior Token:  ${seniorAddress}`);
  console.log(`Junior Token:  ${juniorAddress}`);
  console.log('================================================\n');

  // Save deployment addresses
  console.log('💾 Saving deployment addresses to deployments.json...');
  const fs = require('fs');
  const deployments = {
    network: network.name,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      MockUSDC: usdcAddress,
      SeniorToken: seniorAddress,
      JuniorToken: juniorAddress,
    },
  };

  fs.writeFileSync(
    './deployments.json',
    JSON.stringify(deployments, null, 2)
  );
  console.log('✅ Saved to deployments.json\n');

  // Instructions for next steps
  console.log('📝 NEXT STEPS:');
  console.log('1. Update .env.local with deployed addresses');
  console.log('2. Run: npx hardhat run scripts/deploy-core.ts --network amoy');
  console.log('3. Verify contracts on PolygonScan:');
  console.log(`   npx hardhat verify --network amoy ${usdcAddress}`);
  console.log(`   npx hardhat verify --network amoy ${seniorAddress} "Senior SAFE Token" "sSAFE" true`);
  console.log(`   npx hardhat verify --network amoy ${juniorAddress} "Junior YIELD Token" "jYIELD" false\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });
