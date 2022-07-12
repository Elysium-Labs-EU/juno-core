import { updateEmailLabel } from '../../store/emailListSlice'
import * as global from '../../constants/globalConstants'

interface IArchiveEmail {
  threadId: string
  labelIds: string[]
  dispatch: Function
}

const archiveMail = ({ threadId, labelIds, dispatch }: IArchiveEmail) => {
  const request = {
    removeLabelIds: [
      ...labelIds.filter((item) => item !== global.UNREAD_LABEL),
    ],
  }

  const markEmailArchived = () => {
    dispatch(
      updateEmailLabel({
        threadId,
        request,
        labelIds,
      })
    )
  }

  return markEmailArchived()
}

export default archiveMail
