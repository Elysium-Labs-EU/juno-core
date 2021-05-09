const MessageCount = ({ countOfMessage }) => {
  const LengthMessageCount = () => {
    let length = countOfMessage && countOfMessage.length
    if (length > 1) {
      return <span className="messageCount">({length})</span>
    } else {
      return null
    }
  }

  return <LengthMessageCount />
}

export default MessageCount
