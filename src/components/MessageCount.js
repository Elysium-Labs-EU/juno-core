const MessageCount = ({ countOfMessage }) => {
  function LengthMessageCount() {
    let length = countOfMessage.length
    if (length > 1) {
      return <span className="messageCount">({length})</span>
    } else {
      return null
    }
  }

  return <LengthMessageCount />
}

export default MessageCount
