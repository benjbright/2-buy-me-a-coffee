import Form from "./Form"

const Main = ({ status }) => {
  return (
    <main>
      <div className="image">
        <div className="main-text">
          {/* <h1>Buy me a coffee</h1> */}
          <p>
            The decentralized <span>Buy me a Coffee</span> app
          </p>
        </div>
        <div className="connect-section">
          <p>{status}</p>
        </div>
      </div>
      <div className="form">
        <Form />
      </div>
    </main>
  )
}
export default Main
