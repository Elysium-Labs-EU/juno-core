import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { LocationObjectType } from '../types/globalTypes'

const ArchiveMail = ({
  messageId,
  labelIds,
  location,
  dispatch,
}: {
  messageId: string
  labelIds: string[]
  location: LocationObjectType
  dispatch: any
}) => {
  const request = { removeLabelIds: [...labelIds] }

  const MarkEmailArchived = () => {
    dispatch(
      UpdateMetaListLabel({
        messageId,
        request,
        location,
        labelIds,
      })
    )
  }

  return MarkEmailArchived()
}

export default ArchiveMail
