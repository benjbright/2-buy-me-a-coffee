import { splitString } from "../utils/splitString"

const Messages = ({ memos }) => {
  const memosLength = memos.length
  console.log(memosLength)
  const start = memosLength - 5
  const end = memosLength

  return (
    <div className="messages">
      <p className="messages-header">Previous messages</p>
      {/* {console.log(memos)} */}
      {memos.slice(start, end).map((item, i) => (
        <div key={i} className="message-item">
          <p>{item.message}</p>
          <p className="messages-header">{item.name}</p>
          {/* <p>{splitString(item.from)}</p> */}
        </div>
      ))}
    </div>
  )
}
export default Messages
