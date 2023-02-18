import { setIsReplying } from 'store/emailDetailSlice'
import type { AppDispatch } from 'store/store'
import { openEmail } from 'store/utilsSlice'

interface IReplyOverview {
  id: string
  dispatch: AppDispatch
}

const ReplyOverview = ({ id, dispatch }: IReplyOverview) => {
  dispatch(setIsReplying(true))
  dispatch(openEmail({ id, isReplying: true }))
}

export default ReplyOverview
