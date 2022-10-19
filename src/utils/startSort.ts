import { push } from 'redux-first-history'
import { AppDispatch } from '../store/store'
import { IEmailListObject } from '../store/storeTypes/emailListTypes'
import { setSystemStatusUpdate } from '../store/utilsSlice'

interface IStartSort {
  activeEmailListIndex: number
  dispatch: AppDispatch
  emailList: IEmailListObject[]
  labelURL: string
  selectedEmails?: string[]
}

const startSort = ({
  activeEmailListIndex,
  dispatch,
  emailList,
  labelURL,
  selectedEmails,
}: IStartSort) => {
  if (labelURL && emailList && activeEmailListIndex > -1) {
    if (selectedEmails && selectedEmails?.length > 0) {
      return dispatch(push(`/mail/${labelURL}/${selectedEmails[0]}/messages`))
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
