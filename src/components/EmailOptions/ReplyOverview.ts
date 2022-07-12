import { resetDraftDetails } from '../../store/draftsSlice'
import { setIsReplying } from '../../store/emailDetailSlice'
import { openEmail } from '../../store/utilsSlice'

interface IReplyOverview {
  id: string
  dispatch: Function
}

const ReplyOverview = ({ id, dispatch }: IReplyOverview) => {
  dispatch(resetDraftDetails())
  dispatch(setIsReplying(true))
  dispatch(openEmail({ id }))
}

export default ReplyOverview
