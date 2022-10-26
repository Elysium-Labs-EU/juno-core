import { push } from 'redux-first-history'
import { AppDispatch } from '../store/store'
import {
  IEmailListObject,
  ISelectedEmail,
} from '../store/storeTypes/emailListTypes'
import { setSystemStatusUpdate } from '../store/utilsSlice'

interface IStartSort {
  activeEmailListIndex: number
  dispatch: AppDispatch
  emailList: IEmailListObject[]
  labelURL: string
  selectedEmails?: ISelectedEmail
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
    return dispatch(
      push(
        `/mail/${labelURL}/${emailList[activeEmailListIndex].threads[0].id}/messages`
      )
    )
  }
  return dispatch(
    setSystemStatusUpdate({
      type: 'error',
      message: 'Unable to start sorting.',
    })
  )
}

export default startSort
