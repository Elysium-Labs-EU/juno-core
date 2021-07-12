import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { convertArrayToString } from '../../utils'

const SetCompletedMail = (props) => {
  const { messageId, history, labelIds, dispatch, location } = props
  const labelURL = labelIds && convertArrayToString(labelIds)

  const CompletedAction = () => {
    const request = {
      removeLabelIds: labelIds,
    }
    dispatch(
      UpdateMetaListLabel({ messageId, request, history, labelURL, location })
    )
  }

  return CompletedAction()
}

export default SetCompletedMail
