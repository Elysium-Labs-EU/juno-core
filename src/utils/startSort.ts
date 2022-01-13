import { push } from 'redux-first-history'

interface IStartSort {
  dispatch: Function
  labelURL: string
  emailList: any
  emailListIndex: number
}

const startSort = (props: IStartSort) => {
  const { dispatch, labelURL, emailList, emailListIndex } = props

  if (dispatch && labelURL && emailList && emailListIndex > -1) {
    return dispatch(
      push(
        `/mail/${labelURL}/${emailList[emailListIndex].threads[0].id}/messages`
      )
    )
  }
  return null
}

export default startSort
