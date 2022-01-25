import { resetComposeEmail } from '../../Store/composeSlice'
import { resetDraftDetails } from '../../Store/draftsSlice'
import { setIsReplying } from '../../Store/emailDetailSlice'
import { LabelIdName } from '../../Store/labelsTypes'
import openEmail from '../../utils/openEmail'

interface IReplyOverview {
  labelIds: string[]
  id: string
  dispatch: Function
  inSearch: boolean
  storageLabels: LabelIdName[]
}

const ReplyOverview = ({
  labelIds,
  id,
  dispatch,
  inSearch,
  storageLabels,
}: IReplyOverview) => {
  dispatch(resetComposeEmail())
  dispatch(resetDraftDetails())
  dispatch(setIsReplying(true))
  openEmail({ labelIds, id, dispatch, inSearch, storageLabels })
}

export default ReplyOverview
