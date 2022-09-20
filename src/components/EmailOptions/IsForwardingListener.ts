import { setIsForwarding, setIsReplying } from '../../store/emailDetailSlice'
import { AppDispatch } from '../../store/store'

interface IIsForwardingListener {
  dispatch: AppDispatch
  messageIndex: number
  isReplying?: boolean
}

const isForwardingListener = ({
  dispatch,
  messageIndex,
  isReplying,
}: IIsForwardingListener) => {
  if (isReplying) {
    dispatch(setIsReplying(false))
  }
  if (messageIndex > -1) {
    dispatch(setIsForwarding(true))
  }
}

export default isForwardingListener
