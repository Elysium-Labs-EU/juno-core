import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { convertArrayToString } from '../../utils'

const ArchiveMail = ({ messageId, history, labelIds, location, dispatch }) => {
  const request = { removeLabelIds: [labelIds] }
  const labelURL = labelIds && convertArrayToString(labelIds)

  const MarkEmailArchived = () => {
    dispatch(
      UpdateMetaListLabel({ messageId, request, history, location, labelURL })
    )
  }

  return MarkEmailArchived()
}

export default ArchiveMail
