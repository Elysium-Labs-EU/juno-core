import { setIsReplying } from '../../Store/emailDetailSlice'
import openEmail from '../../utils/openEmail'

const ReplyOverview = ({ labelIds, history, id, dispatch }) => {
  dispatch(setIsReplying(true))
  openEmail({ labelIds, history, id })
}

export default ReplyOverview
