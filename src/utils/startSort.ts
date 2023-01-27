import { push } from 'redux-first-history'

import type { AppDispatch } from 'store/store'
import type {
  TEmailListObject,
  TSelectedEmail,
} from 'store/storeTypes/emailListTypes'
import { setSystemStatusUpdate } from 'store/utilsSlice'

interface IStartSort {
  activeEmailListIndex: number
  dispatch: AppDispatch
  emailList: Array<TEmailListObject>
  labelURL: string
  selectedEmails?: TSelectedEmail
}

/**
 * @function startSort
 * @param {object}
 * Bases on the labelURL the system knows the context of the email list, if it is either Focus or Inbox.
 * @returns {void}
 */

const startSort = ({
  activeEmailListIndex,
  dispatch,
  emailList,
  labelURL,
  selectedEmails,
}: IStartSort) => {
  if (labelURL && emailList && activeEmailListIndex > -1) {
    if (selectedEmails && selectedEmails.selectedIds?.length > 0) {
      return dispatch(
        push(`/mail/${labelURL}/${selectedEmails.selectedIds[0]}/messages`)
      )
    }
    const firstThreadObject = emailList[activeEmailListIndex]?.threads[0]
    if (firstThreadObject) {
      return dispatch(
        push(`/mail/${labelURL}/${firstThreadObject.id}/messages`)
      )
    }
  }
  return dispatch(
    setSystemStatusUpdate({
      type: 'error',
      message: 'Unable to start sorting.',
    })
  )
}

export default startSort
