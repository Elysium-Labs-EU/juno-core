import { UpdateMetaListLabel } from '../../Store/metaListSlice'

const ThrashMail = ({
  messageId,
  history,
  labelURL,
  labelIds,
  location,
  dispatch,
}) => {
  const request = { delete: true }

  const MarkEmailThrashed = () => {
    dispatch(
      UpdateMetaListLabel({
        messageId,
        request,
        history,
        location,
        labelURL,
        labelIds,
      })
    )
  }

  return MarkEmailThrashed()
}

export default ThrashMail
