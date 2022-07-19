import { updateEmailLabel } from '../../store/emailListSlice'
import * as global from '../../constants/globalConstants'
import { AppDispatch } from '../../store/store'

interface IArchiveEmail {
  threadId: string
  labelIds: string[]
  dispatch: AppDispatch
}

const archiveMail = ({ threadId, labelIds, dispatch }: IArchiveEmail) => {
  const request = {
    removeLabelIds: [
      ...labelIds.filter((item) => item !== global.UNREAD_LABEL),
    ],
  }

  dispatch(
    updateEmailLabel({
      threadId,
      request,
      labelIds,
    })
  )
}

export default archiveMail
