import { setCurrentEmail, setIsReplying } from '../../Store/emailDetailSlice'
import openEmail from '../../utils/openEmail'

const ReplyOverview = ({
  labelIds,
  history,
  id,
  dispatch,
}: {
  labelIds: string[]
  history: any
  id: string
  dispatch: any
}) => {
  dispatch(setCurrentEmail(id))
  dispatch(setIsReplying(true))
  openEmail({ labelIds, history, id })
}

export default ReplyOverview
