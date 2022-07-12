import {
  setCurrentMessage,
  setIsForwarding,
  setIsReplying,
} from '../../store/emailDetailSlice'

interface IIsReplyingListener {
  dispatch: Function
  messageIndex: number
  messageId?: string
  isForwarding?: boolean
}

const isReplyingListener = ({
  dispatch,
  messageIndex,
  messageId,
  isForwarding,
}: IIsReplyingListener) => {
  if (isForwarding) {
    dispatch(setIsForwarding(false))
  }
  if (messageIndex > -1) {
    dispatch(setIsReplying(true))
  }
  if (messageId) {
    // This is used to specifically reply to a message.
    dispatch(setCurrentMessage(messageId))
  }
}

export default isReplyingListener
