import { setCurrentEmail, setIsReplying } from '../../Store/emailDetailSlice'
import openEmail from '../../utils/openEmail'

const ReplyOverview = ({
  labelIds,
  id,
  dispatch,
}: {
  labelIds: string[]
  id: string
  dispatch: any
}) => {
  dispatch(setCurrentEmail(id))
  dispatch(setIsReplying(true))
  openEmail({ labelIds, id })
}

export default ReplyOverview
