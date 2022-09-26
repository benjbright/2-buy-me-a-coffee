import { useEffect, useState } from "react"
import { ethers } from "ethers"
// import "./App.css"
import { contractAbi, contractAddress } from "./utils/constants"
import { splitString } from "./utils/splitString"

const Input = ({ placeholder, type, name, handleChange }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      onChange={(e) => handleChange(e, name)}
      className="border-4 my-2"
    />
  )
}

function App() {
  // Component state
  const [connectedAccount, setConnectedAccount] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  })
  const [memosArray, setmemosArray] = useState([])
  const [isWeb3, setIsWeb3] = useState(false)

  // Wallet connection logic
  const { ethereum } = window

  const isWalletConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Please install Metamask")
      }

      if (ethereum) console.log("Metamask wallet detected!")

      const accounts = await ethereum.request({ method: "eth_accounts" })
      console.log(`Accounts: ${accounts}`)

      if (accounts.length > 0) {
        const account = accounts[0]
        console.log("Wallet is connected!" + account)
        setConnectedAccount(account)
        setIsWeb3(true)
      } else {
        console.log("Please connect your wallet")
      }
    } catch (error) {
      console.log(error)

      throw new Error("No ethereum object found...")
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) console.log("No ethereum object found")

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })

      setConnectedAccount(accounts[0])
      console.log(`Connected account is ${accounts[0]}`)
      setIsWeb3(true)
      getMemos()
    } catch (error) {
      console.log(error)
    }
  }

  // Handle form changes
  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }))

    // console.log(e.target.value)
  }

  // Buy coffee
  const buyCoffee = async (e) => {
    e.preventDefault()
    console.log(formData)

    const contract = getEthereumContract()
    console.log(contract)

    console.log("Buying coffee...")
    const coffeeTx = await contract.buyCoffee(formData.name, formData.message, {
      value: ethers.utils.parseEther("0.0001"),
    })

    await coffeeTx.wait(2)

    console.log(`Your transaction has been mined: ${coffeeTx.hash}`)
    console.log("Transaction completed!")

    setFormData({
      name: "",
      message: "",
    })
  }

  // Get memos stored on the blockchain
  const getMemos = async () => {
    if (isWeb3) {
      const contract = getEthereumContract()
      const memos = await contract.getMemos()

      console.log(memos)
      setmemosArray(memos)
    }
  }

  // Get ethereum smart contract
  const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const buyCoffeeContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    )

    // console.log({ provider, signer, buyCoffeeContract })
    return buyCoffeeContract
  }

  useEffect(() => {
    isWalletConnected()
    getMemos()
  }, [isWeb3])

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-[#4E2A2A]">Expresso</h1>
      <p>The express way to buy a coffee for your favourite creators</p>
      {ethereum ? (
        <p>Metamask wallet detected!</p>
      ) : (
        <p>Please install Metamask</p>
      )}
      {isWeb3 ? (
        <p>Your account {splitString(connectedAccount)} has been connected!</p>
      ) : (
        <p>Please connect your Metamask wallet</p>
      )}
      <button
        className="w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded cursor-pointer"
        onClick={connectWallet}
      >
        {isWeb3 ? "Connected!" : "Connect"}
      </button>
      <br />
      <div className="flex flex-col">
        <Input placeholder="Name" name="name" handleChange={handleChange} />
        <Input
          placeholder="Message"
          name="message"
          handleChange={handleChange}
        />
        <button
          type="button"
          onClick={buyCoffee}
          className="w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded cursor-pointer"
        >
          Buy me a coffee!
        </button>
      </div>
      <div>
        <h2>Previous messages:</h2>
        {memosArray.map((item, i) => (
          <p key={i}>{item.message}</p>
        ))}
      </div>
    </div>
  )
}

export default App
