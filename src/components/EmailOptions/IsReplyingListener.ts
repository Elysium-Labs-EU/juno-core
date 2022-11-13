import { setIsForwarding, setIsReplying } from 'store/emailDetailSlice'
import { AppDispatch } from 'store/store'

interface IIsReplyingListener {
  dispatch: AppDispatch
  isForwarding?: boolean
}

/**
 * @function isReplyingListener
 * @param dispatch
 * @param isForwarding a boolean stating if the app is in forwarding mode
 * @returns {void} sets the state for replying and turns off forwarding if needed.
 */

const isReplyingListener = ({
  dispatch,
  isForwarding,
}: IIsReplyingListener) => {
  if (isForwarding) {
    dispatch(setIsForwarding(false))
  }
  dispatch(setIsReplying(true))
}

export default isReplyingListener
