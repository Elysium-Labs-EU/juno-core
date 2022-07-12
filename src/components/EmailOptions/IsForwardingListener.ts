import {
  setCurrentMessage,
  setIsForwarding,
  setIsReplying,
} from '../../store/emailDetailSlice'

interface IIsForwardingListener {
  dispatch: Function
  messageIndex: number
  messageId?: string
  isReplying?: boolean
}

const isForwardingListener = ({
  dispatch,
  messageIndex,
  messageId,
  isReplying,
}: IIsForwardingListener) => {
  if (isReplying) {
    dispatch(setIsReplying(false))
  }
  if (messageIndex > -1) {
    dispatch(setIsForwarding(true))
  }
  if (messageId) {
    // This is used to specifically reply to a message.
    dispatch(setCurrentMessage(messageId))
  }
}

export default isForwardingListener
