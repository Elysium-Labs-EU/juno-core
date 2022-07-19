import { resetDraftDetails } from '../../store/draftsSlice'
import { setIsReplying } from '../../store/emailDetailSlice'
import { AppDispatch } from '../../store/store'
import { openEmail } from '../../store/utilsSlice'

interface IReplyOverview {
  id: string
  dispatch: AppDispatch
}

const ReplyOverview = ({ id, dispatch }: IReplyOverview) => {
  dispatch(resetDraftDetails())
  dispatch(setIsReplying(true))
  dispatch(openEmail({ id }))
}

export default ReplyOverview
