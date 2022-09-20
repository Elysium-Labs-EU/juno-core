import { setIsForwarding, setIsReplying } from '../../store/emailDetailSlice'
import { AppDispatch } from '../../store/store'

interface IIsReplyingListener {
  dispatch: AppDispatch
  messageIndex: number
  isForwarding?: boolean
}

const isReplyingListener = ({
  dispatch,
  messageIndex,
  isForwarding,
}: IIsReplyingListener) => {
  if (isForwarding) {
    dispatch(setIsForwarding(false))
  }
  if (messageIndex > -1) {
    dispatch(setIsReplying(true))
  }
}

export default isReplyingListener
