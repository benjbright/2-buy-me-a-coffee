import Form from "./Form"
import Messages from "./Messages"

const Main = ({
  status,
  handleChange,
  handleSubmit,
  formData,
  message,
  memos,
}) => {
  return (
    <main>
      <div className="image">
        <div className="main-text">
          <p>
            The decentralized <span>Buy me a Coffee</span> app
          </p>
        </div>
        <div className="connect-section">
          <p>{status}</p>
        </div>
        <div className="form-section">
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
          />
        </div>
        <div className="message">
          <p>{message}</p>
        </div>
      </div>

      <div className="messages-window">
        <Messages memos={memos} />
      </div>
    </main>
  )
}
export default Main
