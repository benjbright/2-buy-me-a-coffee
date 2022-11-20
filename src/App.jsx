import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { contractAbi, contractAddress } from "./utils/constants"
import { splitString } from "./utils/splitString"
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"

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
  const [connected, setConnected] = useState(false)
  const [status, setStatus] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  })

  const [message, setMessage] = useState("Waiting for your order...")

  const [memosArray, setmemosArray] = useState([])

  const [isWeb3, setIsWeb3] = useState(false)

  const { ethereum } = window

  // Called once on initial page render
  useEffect(() => {
    async function fetchWallet() {
      const { address, status, connected } = await getCurrentWalletConnected()
      setStatus(status)
      setConnectedAccount(address)
      setConnected(connected)
      console.log(address)
      console.log(status)
    }

    fetchWallet()
    addWalletListener()
    getMemos()
  }, [])

  // Wallet connection logic

  // Get the current wallet connected details
  const getCurrentWalletConnected = async () => {
    // Check if an Ethereum account is already connected
    // to our dApp on page load and update our UI
    if (ethereum) {
      try {
        const addressArray = await ethereum.request({
          method: "eth_accounts",
        })
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "Connected, welcome to Web 3!",
            connected: true,
          }
        } else {
          return {
            address: "",
            status: "Please connect to Metamask",
            connected: false,
          }
        }
      } catch (error) {
        return {
          address: "",
          status: error.message,
          connected: false,
        }
      }
    } else {
      return {
        address: "",
        status: `Please install
        <a href="https://metamask.io/download"> Metamask</a>, a virtual
        ethereum wallet, in your browser.`,
        connected: false,
      }
    }
  }

  const addWalletListener = () => {
    // Listener function to detect changes in wallet state

    if (!ethereum) {
      console.log("Please install Metamask")
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download`}>
            Please install Metamask, a virtual Ethereum wallet, in your browser.
          </a>
        </p>
      )
    }

    if (ethereum) {
      console.log("Metamask detected!")
      setStatus("Please connect to Metamask")

      ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setConnectedAccount(accounts[0])
          setStatus("Connected to Metamask, welcome to Web 3!")
          setConnected(true)
          console.log("Connected to Metamask")
        } else {
          setStatus("Please connect to Metamask")
          setConnected(false)
          console.log("Metamask not connected")
        }
      })
    }

    // if (ethereum) console.log("Metamask wallet detected!")

    // const accounts = await ethereum.request({ method: "eth_accounts" })
    // console.log(`Accounts: ${accounts}`)

    // if (accounts.length > 0) {
    //   const account = accounts[0]
    //   console.log("Wallet is connected!" + account)
    //   setConnectedAccount(account)
    //   // setIsWeb3(true)
    // } else {
    //   console.log("Please connect your wallet")
    // }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) console.log("No ethereum object found")

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })

      setConnectedAccount(accounts[0])
      console.log(`Connected account is ${accounts[0]}`)
      // setIsWeb3(true)
      setStatus("Connected to Metamask, welcome to Web 3!")
      setConnected(true)
      getMemos()
    } catch (error) {
      console.log(error)
    }
  }

  // Handle form changes
  const handleChange = (e, name) => {
    // console.log(e.target.value)
    // console.log(name)
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }))
  }

  // Buy coffee
  const buyCoffee = async (e) => {
    e.preventDefault()
    console.log(formData)

    const contract = getEthereumContract()
    console.log(contract)

    console.log("Waiting for approval...")
    setMessage("Waiting for approval...")
    const coffeeTx = await contract.buyCoffee(formData.name, formData.message, {
      value: ethers.utils.parseEther("0.0001"),
    })

    console.log("Waiting for block confirmation...")
    setMessage("Waiting for block confirmation...")

    await coffeeTx.wait(2)

    console.log(`Your transaction has been mined: ${coffeeTx.hash}`)
    console.log("Transaction completed!")
    setMessage(`Your transaction has been mined: ${coffeeTx.hash}`)

    setFormData({
      name: "",
      message: "",
    })

    setTimeout(() => {
      setMessage("Waiting for your order...")
    }, 10000)
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

  return (
    <div>
      <Header onClick={connectWallet} connected={connected} />
      <Main
        status={status}
        handleChange={handleChange}
        handleSubmit={buyCoffee}
        formData={formData}
        message={message}
      />

      <Footer />
      {/* <p>The express way to buy a coffee for your favourite creators</p>
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
          <div key={i}>
            <p>{item.message}</p>
            <p>{item.name}</p>
            <p>{splitString(item.from)}</p>
            <br />
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default App
