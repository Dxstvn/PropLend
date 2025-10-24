import { ethers } from 'hardhat';

/**
 * @title Core Contract Deployment Script
 * @notice Deploys LendingPool, InterestDistributor, and SecondaryMarket
 *
 * Prerequisites:
 * - Tokens must be deployed first (run deploy-tokens.ts)
 * - deployments.json must exist with token addresses
 *
 * Deployment Order:
 * 1. LendingPool
 * 2. InterestDistributor
 * 3. SecondaryMarket
 * 4. Link contracts together (set addresses)
 * 5. Grant roles
 *
 * Usage:
 *   npx hardhat run scripts/deploy-core.ts --network amoy
 */
async function main() {
  console.log('\n🚀 Deploying PropertyLend Core Contracts to', network.name);
  console.log('================================================\n');

  const [deployer] = await ethers.getSigners();
  console.log('📍 Deployer address:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('💰 Deployer balance:', ethers.formatEther(balance), 'POL\n');

  // Load token addresses from previous deployment
  const fs = require('fs');
  let tokenDeployment;
  try {
    tokenDeployment = JSON.parse(fs.readFileSync('./deployments.json', 'utf8'));
  } catch (error) {
    console.error('❌ Could not read deployments.json');
    console.error('   Run deploy-tokens.ts first!\n');
    process.exit(1);
  }

  const usdcAddress = tokenDeployment.contracts.MockUSDC;
  const seniorTokenAddress = tokenDeployment.contracts.SeniorToken;
  const juniorTokenAddress = tokenDeployment.contracts.JuniorToken;

  console.log('📦 Using Token Addresses:');
  console.log(`   MockUSDC:      ${usdcAddress}`);
  console.log(`   Senior Token:  ${seniorTokenAddress}`);
  console.log(`   Junior Token:  ${juniorTokenAddress}\n`);

  // Platform treasury (for testing, use deployer; in production, use multisig)
  const platformTreasury = deployer.address;
  console.log(`💼 Platform Treasury: ${platformTreasury}\n`);

  // 1. Deploy LendingPool
  console.log('1️⃣  Deploying LendingPool...');
  const LendingPool = await ethers.getContractFactory('LendingPool');
  const lendingPool = await LendingPool.deploy(usdcAddress);
  await lendingPool.waitForDeployment();

  const poolAddress = await lendingPool.getAddress();
  console.log('✅ LendingPool deployed to:', poolAddress, '\n');

  // 2. Deploy InterestDistributor
  console.log('2️⃣  Deploying InterestDistributor...');
  const InterestDistributor = await ethers.getContractFactory('InterestDistributor');
  const distributor = await InterestDistributor.deploy(usdcAddress, platformTreasury);
  await distributor.waitForDeployment();

  const distributorAddress = await distributor.getAddress();
  console.log('✅ InterestDistributor deployed to:', distributorAddress, '\n');

  // 3. Deploy SecondaryMarket
  console.log('3️⃣  Deploying SecondaryMarket...');
  const SecondaryMarket = await ethers.getContractFactory('SecondaryMarket');
  const market = await SecondaryMarket.deploy(usdcAddress, platformTreasury);
  await market.waitForDeployment();

  const marketAddress = await market.getAddress();
  console.log('✅ SecondaryMarket deployed to:', marketAddress, '\n');

  // 4. Link contracts together
  console.log('🔗 Linking contracts...');

  console.log('   Setting tranche tokens in LendingPool...');
  const tx1 = await lendingPool.setTrancheTokens(seniorTokenAddress, juniorTokenAddress);
  await tx1.wait();
  console.log('   ✅ Tranche tokens set in LendingPool');

  console.log('   Setting interest distributor in LendingPool...');
  const tx2 = await lendingPool.setInterestDistributor(distributorAddress);
  await tx2.wait();
  console.log('   ✅ Interest distributor set in LendingPool');

  console.log('   Setting lending pool in InterestDistributor...');
  const tx3 = await distributor.setLendingPool(poolAddress);
  await tx3.wait();
  console.log('   ✅ Lending pool set in InterestDistributor');

  console.log('   Setting tranche tokens in SecondaryMarket...');
  const tx4 = await market.setTrancheTokens(seniorTokenAddress, juniorTokenAddress);
  await tx4.wait();
  console.log('   ✅ Tranche tokens set in SecondaryMarket\n');

  // 5. Grant roles
  console.log('👑 Granting roles...');

  // Grant MINTER_ROLE and BURNER_ROLE to LendingPool for both tokens
  const seniorToken = await ethers.getContractAt('TrancheToken', seniorTokenAddress);
  const juniorToken = await ethers.getContractAt('TrancheToken', juniorTokenAddress);

  const MINTER_ROLE = await seniorToken.MINTER_ROLE();
  const BURNER_ROLE = await seniorToken.BURNER_ROLE();

  console.log('   Granting MINTER_ROLE to LendingPool for Senior Token...');
  const tx5 = await seniorToken.grantRole(MINTER_ROLE, poolAddress);
  await tx5.wait();

  console.log('   Granting BURNER_ROLE to LendingPool for Senior Token...');
  const tx6 = await seniorToken.grantRole(BURNER_ROLE, poolAddress);
  await tx6.wait();

  console.log('   Granting MINTER_ROLE to LendingPool for Junior Token...');
  const tx7 = await juniorToken.grantRole(MINTER_ROLE, poolAddress);
  await tx7.wait();

  console.log('   Granting BURNER_ROLE to LendingPool for Junior Token...');
  const tx8 = await juniorToken.grantRole(BURNER_ROLE, poolAddress);
  await tx8.wait();

  console.log('   ✅ All roles granted\n');

  // Summary
  console.log('================================================');
  console.log('📋 DEPLOYMENT SUMMARY');
  console.log('================================================');
  console.log('Tokens:');
  console.log(`  MockUSDC:         ${usdcAddress}`);
  console.log(`  Senior Token:     ${seniorTokenAddress}`);
  console.log(`  Junior Token:     ${juniorTokenAddress}`);
  console.log('\nCore Contracts:');
  console.log(`  LendingPool:      ${poolAddress}`);
  console.log(`  InterestDist:     ${distributorAddress}`);
  console.log(`  SecondaryMarket:  ${marketAddress}`);
  console.log('\nConfiguration:');
  console.log(`  Platform Treasury: ${platformTreasury}`);
  console.log('================================================\n');

  // Update deployments.json
  console.log('💾 Updating deployments.json...');
  tokenDeployment.contracts.LendingPool = poolAddress;
  tokenDeployment.contracts.InterestDistributor = distributorAddress;
  tokenDeployment.contracts.SecondaryMarket = marketAddress;
  tokenDeployment.config = {
    platformTreasury,
  };

  fs.writeFileSync(
    './deployments.json',
    JSON.stringify(tokenDeployment, null, 2)
  );
  console.log('✅ Updated deployments.json\n');

  // Instructions for next steps
  console.log('📝 NEXT STEPS:');
  console.log('1. Update .env.local with all contract addresses');
  console.log('2. Verify contracts on PolygonScan:');
  console.log(`   npx hardhat verify --network amoy ${poolAddress} "${usdcAddress}"`);
  console.log(`   npx hardhat verify --network amoy ${distributorAddress} "${usdcAddress}" "${platformTreasury}"`);
  console.log(`   npx hardhat verify --network amoy ${marketAddress} "${usdcAddress}" "${platformTreasury}"`);
  console.log('3. Test deposit/withdrawal on testnet');
  console.log('4. Update frontend with contract addresses\n');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });
