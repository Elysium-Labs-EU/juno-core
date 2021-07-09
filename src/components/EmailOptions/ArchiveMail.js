import { UpdateMetaListLabel } from '../../Store/metaListSlice'

const ArchiveMail = ({
  messageId,
  history,
  labelURL,
  labelIds,
  location,
  dispatch,
}) => {
  const request = { removeLabelIds: [labelIds] }

  const MarkEmailArchived = () => {
    dispatch(
      UpdateMetaListLabel({ messageId, request, history, location, labelURL })
    )
  }

  return MarkEmailArchived()
}

export default ArchiveMail
