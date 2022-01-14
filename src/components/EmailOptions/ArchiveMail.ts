import { updateEmailLabel } from '../../Store/emailListSlice'
import * as global from '../../constants/globalConstants'

interface IArchiveEmail {
  messageId: string
  labelIds: string[]
  dispatch: Function
}

const archiveMail = ({ messageId, labelIds, dispatch }: IArchiveEmail) => {
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
        labelIds,
      })
    )
  }

  return markEmailArchived()
}

export default archiveMail
