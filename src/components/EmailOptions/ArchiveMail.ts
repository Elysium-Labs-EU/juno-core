import { updateEmailListLabel } from '../../Store/emailListSlice'
import { LocationObjectType } from '../types/globalTypes'
import * as global from '../../constants/globalConstants'

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
  const request = {
    removeLabelIds: [
      ...labelIds.filter((item) => item !== global.UNREAD_LABEL),
    ],
  }

  const MarkEmailArchived = () => {
    dispatch(
      updateEmailListLabel({
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
