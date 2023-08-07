import * as global from 'constants/globalConstants'
import { updateEmailLabel } from 'store/emailListSlice'
import type { AppThunkDispatch } from 'store/store'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

interface ArchiveEmail {
  threadId: string
  labelIds: TLabelState['labelIds']
  dispatch: AppThunkDispatch
}

/**
 * @function archiveMail
 * @param {object} - takes in a threadId, labelIds, and dispatch function to trigger the Redux thunk to update the email label.
 * @returns {void}
 */

const archiveMail = ({ threadId, labelIds, dispatch }: ArchiveEmail) => {
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
