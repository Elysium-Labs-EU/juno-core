import {
  setCurrentMessage,
  setIsForwarding,
  setIsReplying,
} from '../../store/emailDetailSlice'
import { AppDispatch } from '../../store/store'

interface IIsForwardingListener {
  dispatch: AppDispatch
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
