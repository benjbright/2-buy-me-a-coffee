async function main() {
  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee")
  const buyMeACoffee = await BuyMeACoffee.deploy()
  await buyMeACoffee.deployed()
  console.log(`BuyMeACoffee deployed to: ${buyMeACoffee.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// Contract deployed on the Goerli test network at address:
// 0xB4beE10182a0a2D10D6496C47e6Bcf7f38ece295
