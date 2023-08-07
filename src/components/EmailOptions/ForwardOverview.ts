import { setIsForwarding, setViewIndex } from 'store/emailDetailSlice'
import type { AppDispatch } from 'store/store'
import { openEmail } from 'store/utilsSlice'

interface IForwardOverview {
  id: string
  emailIndex: number
  dispatch: AppDispatch
}

const ForwardOverview = ({ id, emailIndex, dispatch }: IForwardOverview) => {
  dispatch(setIsForwarding(true))
  dispatch(setViewIndex(emailIndex))
  void dispatch(openEmail({ id, isForwarding: true }))
}

export default ForwardOverview
