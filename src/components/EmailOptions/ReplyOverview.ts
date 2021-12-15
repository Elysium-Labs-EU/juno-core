import { resetComposeEmail } from '../../Store/composeSlice'
import { resetDraftDetails } from '../../Store/draftsSlice'
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
  dispatch(resetComposeEmail())
  dispatch(resetDraftDetails())
  dispatch(setCurrentEmail(id))
  dispatch(setIsReplying(true))
  openEmail({ labelIds, id, dispatch })
}

export default ReplyOverview
