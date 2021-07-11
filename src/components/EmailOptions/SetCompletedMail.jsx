import { UpdateMetaListLabel } from '../../Store/metaListSlice'

const SetCompletedMail = (props) => {
  const { messageId, history, labelURL, labelIds, dispatch, location } = props

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
