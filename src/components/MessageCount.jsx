const MessageCount = ({ countOfMessage }) => {
  const LengthMessageCount = () => {
    const length = countOfMessage && countOfMessage.length
    if (length > 1) {
      return <span className="messageCount">({length})</span>
    }
    return null
  }

  return <LengthMessageCount />
}

export default MessageCount
