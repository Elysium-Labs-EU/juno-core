import { resetComposeEmail } from '../../Store/composeSlice'
import { resetDraftDetails } from '../../Store/draftsSlice'
import { setCurrentEmail, setIsReplying } from '../../Store/emailDetailSlice'
import { LabelIdName } from '../../Store/labelsTypes'
import openEmail from '../../utils/openEmail'

interface IReplyOverview {
  labelIds: string[]
  id: string
  dispatch: Function
  isSearching: boolean
  storageLabels: LabelIdName[]
}

const ReplyOverview = ({
  labelIds,
  id,
  dispatch,
  isSearching,
  storageLabels,
}: IReplyOverview) => {
  dispatch(resetComposeEmail())
  dispatch(resetDraftDetails())
  dispatch(setCurrentEmail(id))
  dispatch(setIsReplying(true))
  openEmail({ labelIds, id, dispatch, isSearching, storageLabels })
}

export default ReplyOverview
