import { setIsReplying, setViewIndex } from 'store/emailDetailSlice'
import type { AppDispatch } from 'store/store'
import { openEmail } from 'store/utilsSlice'

interface IReplyOverview {
  id: string
  emailIndex: number
  dispatch: AppDispatch
}

const ReplyOverview = ({ id, emailIndex, dispatch }: IReplyOverview) => {
  dispatch(setIsReplying(true))
  dispatch(setViewIndex(emailIndex))
  void dispatch(openEmail({ id, isReplying: true }))
}

export default ReplyOverview
