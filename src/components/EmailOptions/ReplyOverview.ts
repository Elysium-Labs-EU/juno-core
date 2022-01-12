import { resetComposeEmail } from '../../Store/composeSlice'
import { resetDraftDetails } from '../../Store/draftsSlice'
import { setCurrentEmail, setIsReplying } from '../../Store/emailDetailSlice'
import openEmail from '../../utils/openEmail'

interface IReplyOverview {
  labelIds: string[]
  id: string
  dispatch: Function
  isSearching: boolean
}

const ReplyOverview = ({
  labelIds,
  id,
  dispatch,
  isSearching,
}: IReplyOverview) => {
  dispatch(resetComposeEmail())
  dispatch(resetDraftDetails())
  dispatch(setCurrentEmail(id))
  dispatch(setIsReplying(true))
  openEmail({ labelIds, id, dispatch, isSearching })
}

export default ReplyOverview
