import { setIsForwarding, setIsReplying } from 'store/emailDetailSlice'
import type { AppDispatch } from 'store/store'

interface IsForwardingListener {
  dispatch: AppDispatch
  isReplying?: boolean
}

/**
 * @function isForwardingListener
 * @param dispatch
 * @param isReplying a boolean stating if the app is in replying mode
 * @returns {void} sets the state for forwarding and turns off replying if needed.
 */

const isForwardingListener = ({
  dispatch,
  isReplying,
}: IsForwardingListener) => {
  if (isReplying) {
    dispatch(setIsReplying(false))
  }
  dispatch(setIsForwarding(true))
}

export default isForwardingListener
