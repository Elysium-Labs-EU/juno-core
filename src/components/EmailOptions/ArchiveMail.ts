import * as global from 'constants/globalConstants'
import { updateEmailLabel } from 'store/emailListSlice'
import type { AppDispatch } from 'store/store'

interface IArchiveEmail {
  threadId: string
  labelIds: Array<string>
  dispatch: AppDispatch
}

/**
 * @function archiveMail
 * @param {object} - takes in a threadId, labelIds, and dispatch function to trigger the Redux thunk to update the email label.
 * @returns {void}
 */

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
