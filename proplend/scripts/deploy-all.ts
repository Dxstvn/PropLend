import { ethers } from 'hardhat';

/**
 * @title Complete Deployment Script
 * @notice Deploys all PropertyLend contracts in one go
 *
 * Executes full deployment sequence:
 * 1. MockUSDC
 * 2. Senior Token (sSAFE)
 * 3. Junior Token (jYIELD)
 * 4. LendingPool
 * 5. InterestDistributor
 * 6. SecondaryMarket
 * 7. Link contracts
 * 8. Grant roles
 * 9. Initial configuration
 *
 * Usage:
 *   npx hardhat run scripts/deploy-all.ts --network amoy
 *
 * For production deployment with verification:
 *   npx hardhat run scripts/deploy-all.ts --network polygon
 */
async function main() {
  console.log('\n🚀 PropertyLend Full Deployment');
  console.log('================================================');
  console.log('Network:', network.name);
  console.log('================================================\n');

  const [deployer] = await ethers.getSigners();
  console.log('📍 Deployer:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('💰 Balance:', ethers.formatEther(balance), network.name === 'amoy' ? 'POL' : 'MATIC');

  if (balance < ethers.parseEther('0.5')) {
    console.error('\n❌ Insufficient balance for deployment (need at least 0.5 tokens)');
    process.exit(1);
  }

  console.log('\n⏳ Estimated deployment time: 2-3 minutes\n');

  const startTime = Date.now();

  // ============================================
  // STEP 1: Deploy Tokens
  // ============================================
  console.log('═══════════════════════════════════════════════');
  console.log('STEP 1: Deploying Tokens');
  console.log('═══════════════════════════════════════════════\n');

  console.log('1.1 Deploying MockUSDC...');
  const MockUSDC = await ethers.getContractFactory('MockUSDC');
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  const usdcAddress = await usdc.getAddress();
  console.log('✅ MockUSDC:', usdcAddress, '\n');

  console.log('1.2 Deploying Senior Token (sSAFE)...');
  const TrancheToken = await ethers.getContractFactory('TrancheToken');
  const seniorToken = await TrancheToken.deploy('Senior SAFE Token', 'sSAFE', true);
  await seniorToken.waitForDeployment();
  const seniorTokenAddress = await seniorToken.getAddress();
  console.log('✅ Senior Token:', seniorTokenAddress, '\n');

  console.log('1.3 Deploying Junior Token (jYIELD)...');
  const juniorToken = await TrancheToken.deploy('Junior YIELD Token', 'jYIELD', false);
  await juniorToken.waitForDeployment();
  const juniorTokenAddress = await juniorToken.getAddress();
  console.log('✅ Junior Token:', juniorTokenAddress, '\n');

  // ============================================
  // STEP 2: Deploy Core Contracts
  // ============================================
  console.log('═══════════════════════════════════════════════');
  console.log('STEP 2: Deploying Core Contracts');
  console.log('═══════════════════════════════════════════════\n');

  const platformTreasury = deployer.address; // Use deployer for testnet; multisig for mainnet

  console.log('2.1 Deploying LendingPool...');
  const LendingPool = await ethers.getContractFactory('LendingPool');
  const lendingPool = await LendingPool.deploy(usdcAddress);
  await lendingPool.waitForDeployment();
  const poolAddress = await lendingPool.getAddress();
  console.log('✅ LendingPool:', poolAddress, '\n');

  console.log('2.2 Deploying InterestDistributor...');
  const InterestDistributor = await ethers.getContractFactory('InterestDistributor');
  const distributor = await InterestDistributor.deploy(usdcAddress, platformTreasury);
  await distributor.waitForDeployment();
  const distributorAddress = await distributor.getAddress();
  console.log('✅ InterestDistributor:', distributorAddress, '\n');

  console.log('2.3 Deploying SecondaryMarket...');
  const SecondaryMarket = await ethers.getContractFactory('SecondaryMarket');
  const market = await SecondaryMarket.deploy(usdcAddress, platformTreasury);
  await market.waitForDeployment();
  const marketAddress = await market.getAddress();
  console.log('✅ SecondaryMarket:', marketAddress, '\n');

  // ============================================
  // STEP 3: Link Contracts
  // ============================================
  console.log('═══════════════════════════════════════════════');
  console.log('STEP 3: Linking Contracts');
  console.log('═══════════════════════════════════════════════\n');

  console.log('3.1 Setting tranche tokens in LendingPool...');
  await (await lendingPool.setTrancheTokens(seniorTokenAddress, juniorTokenAddress)).wait();
  console.log('✅ Done\n');

  console.log('3.2 Setting interest distributor in LendingPool...');
  await (await lendingPool.setInterestDistributor(distributorAddress)).wait();
  console.log('✅ Done\n');

  console.log('3.3 Setting lending pool in InterestDistributor...');
  await (await distributor.setLendingPool(poolAddress)).wait();
  console.log('✅ Done\n');

  console.log('3.4 Setting tranche tokens in SecondaryMarket...');
  await (await market.setTrancheTokens(seniorTokenAddress, juniorTokenAddress)).wait();
  console.log('✅ Done\n');

  // ============================================
  // STEP 4: Grant Roles
  // ============================================
  console.log('═══════════════════════════════════════════════');
  console.log('STEP 4: Granting Roles');
  console.log('═══════════════════════════════════════════════\n');

  const MINTER_ROLE = await seniorToken.MINTER_ROLE();
  const BURNER_ROLE = await seniorToken.BURNER_ROLE();

  console.log('4.1 Granting roles to LendingPool for Senior Token...');
  await (await seniorToken.grantRole(MINTER_ROLE, poolAddress)).wait();
  await (await seniorToken.grantRole(BURNER_ROLE, poolAddress)).wait();
  console.log('✅ Done\n');

  console.log('4.2 Granting roles to LendingPool for Junior Token...');
  await (await juniorToken.grantRole(MINTER_ROLE, poolAddress)).wait();
  await (await juniorToken.grantRole(BURNER_ROLE, poolAddress)).wait();
  console.log('✅ Done\n');

  // ============================================
  // STEP 5: Save Deployment Data
  // ============================================
  console.log('═══════════════════════════════════════════════');
  console.log('STEP 5: Saving Deployment Data');
  console.log('═══════════════════════════════════════════════\n');

  const deployment = {
    network: network.name,
    chainId: network.config.chainId,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      MockUSDC: usdcAddress,
      SeniorToken: seniorTokenAddress,
      JuniorToken: juniorTokenAddress,
      LendingPool: poolAddress,
      InterestDistributor: distributorAddress,
      SecondaryMarket: marketAddress,
    },
    config: {
      platformTreasury,
      seniorRatio: 80,
      juniorRatio: 20,
      maxLTV: 65,
      minDeposit: 100,
      tradingFeeBPS: 30,
    },
  };

  const fs = require('fs');
  fs.writeFileSync('./deployments.json', JSON.stringify(deployment, null, 2));
  console.log('✅ Saved to deployments.json\n');

  // ============================================
  // DEPLOYMENT COMPLETE
  // ============================================
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  console.log('═══════════════════════════════════════════════');
  console.log('🎉 DEPLOYMENT COMPLETE');
  console.log('═══════════════════════════════════════════════');
  console.log(`⏱️  Duration: ${duration}s`);
  console.log('Network:', network.name);
  console.log('\n📦 Contract Addresses:');
  console.log('─────────────────────────────────────────────');
  console.log('MockUSDC:           ', usdcAddress);
  console.log('Senior Token:       ', seniorTokenAddress);
  console.log('Junior Token:       ', juniorTokenAddress);
  console.log('LendingPool:        ', poolAddress);
  console.log('InterestDistributor:', distributorAddress);
  console.log('SecondaryMarket:    ', marketAddress);
  console.log('─────────────────────────────────────────────');
  console.log('Platform Treasury:  ', platformTreasury);
  console.log('═══════════════════════════════════════════════\n');

  // ============================================
  // NEXT STEPS
  // ============================================
  console.log('📝 NEXT STEPS:\n');
  console.log('1️⃣  Update .env.local:');
  console.log(`   NEXT_PUBLIC_USDC_ADDRESS=${usdcAddress}`);
  console.log(`   NEXT_PUBLIC_SENIOR_TOKEN_ADDRESS=${seniorTokenAddress}`);
  console.log(`   NEXT_PUBLIC_JUNIOR_TOKEN_ADDRESS=${juniorTokenAddress}`);
  console.log(`   NEXT_PUBLIC_LENDING_POOL_ADDRESS=${poolAddress}`);
  console.log(`   NEXT_PUBLIC_INTEREST_DISTRIBUTOR_ADDRESS=${distributorAddress}`);
  console.log(`   NEXT_PUBLIC_SECONDARY_MARKET_ADDRESS=${marketAddress}\n`);

  console.log('2️⃣  Verify contracts on PolygonScan:');
  console.log(`   npx hardhat verify --network ${network.name} ${usdcAddress}`);
  console.log(`   npx hardhat verify --network ${network.name} ${seniorTokenAddress} "Senior SAFE Token" "sSAFE" true`);
  console.log(`   npx hardhat verify --network ${network.name} ${juniorTokenAddress} "Junior YIELD Token" "jYIELD" false`);
  console.log(`   npx hardhat verify --network ${network.name} ${poolAddress} "${usdcAddress}"`);
  console.log(`   npx hardhat verify --network ${network.name} ${distributorAddress} "${usdcAddress}" "${platformTreasury}"`);
  console.log(`   npx hardhat verify --network ${network.name} ${marketAddress} "${usdcAddress}" "${platformTreasury}"\n`);

  console.log('3️⃣  Test the deployment:');
  console.log('   - Mint MockUSDC to your wallet');
  console.log('   - Test deposit into senior/junior tranches');
  console.log('   - Verify tranche token balances');
  console.log('   - Test withdrawal\n');

  console.log('4️⃣  Frontend integration:');
  console.log('   - Update contract addresses in frontend');
  console.log('   - Test wallet connection');
  console.log('   - Test deposit/withdrawal UI\n');

  console.log('═══════════════════════════════════════════════\n');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ DEPLOYMENT FAILED\n');
    console.error(error);
    process.exit(1);
  });
