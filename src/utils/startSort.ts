import { push } from 'redux-first-history'
import { AppDispatch } from '../store/store'
import { setSystemStatusUpdate } from '../store/utilsSlice'

interface IStartSort {
  dispatch: AppDispatch
  labelURL: string
  emailList: any
  activeEmailListIndex: number
}

const startSort = ({
  dispatch,
  labelURL,
  emailList,
  activeEmailListIndex,
}: IStartSort) => {
  if (labelURL && emailList && activeEmailListIndex > -1) {
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
