import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { convertArrayToString } from '../../utils'
import { LocationObjectType } from '../types/globalTypes'

const ArchiveMail = ({
  messageId,
  history,
  labelIds,
  location,
  dispatch,
}: {
  messageId: string
  history?: any
  labelIds: string[]
  location: LocationObjectType
  dispatch: any
}) => {
  const request = { removeLabelIds: [...labelIds] }
  const labelURL = labelIds && convertArrayToString(labelIds[0])

  const MarkEmailArchived = () => {
    dispatch(
      UpdateMetaListLabel({
        messageId,
        request,
        history,
        location,
        labelIds,
      })
    )
  }

  return MarkEmailArchived()
}

export default ArchiveMail
