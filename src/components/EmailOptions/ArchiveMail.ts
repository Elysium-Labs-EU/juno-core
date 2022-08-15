import { updateEmailLabel } from '../../store/emailListSlice'
import * as global from '../../constants/globalConstants'
import { AppDispatch } from '../../store/store'

interface IArchiveEmail {
  threadId: string
  labelIds: string[]
  dispatch: AppDispatch
  location?: any
}

/**
 * @function archiveMail
 * @param {object} - takes in a threadId, labelIds, and dispatch function to trigger the Redux thunk to update the email label.
 * @returns {void}
 */

const archiveMail = ({
  threadId,
  labelIds,
  dispatch,
  location,
}: IArchiveEmail) => {
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
      location,
    })
  )
}

export default archiveMail
