import { splitString } from "../utils/splitString"

const Messages = ({ memos }) => {
  return (
    <div className="messages">
      <p>Previous messages</p>
      {console.log(memos)}
      {memos.slice(0, 4).map((item, i) => (
        <div key={i} className="message-item">
          <p>{item.message}</p>
          <p>{item.name}</p>
          <p>{splitString(item.from)}</p>
        </div>
      ))}
    </div>
  )
}
export default Messages
