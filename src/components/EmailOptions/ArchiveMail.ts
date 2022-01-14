import { updateEmailLabel } from '../../Store/emailListSlice'
import * as global from '../../constants/globalConstants'

interface IArchiveEmail {
  messageId: string
  labelIds: string[]
  location: any
  dispatch: Function
}

const archiveMail = ({
  messageId,
  labelIds,
  location,
  dispatch,
}: IArchiveEmail) => {
  const request = {
    removeLabelIds: [
      ...labelIds.filter((item) => item !== global.UNREAD_LABEL),
    ],
  }

  const markEmailArchived = () => {
    dispatch(
      updateEmailLabel({
        messageId,
        request,
        location,
        labelIds,
      })
    )
  }

  return markEmailArchived()
}

export default archiveMail
