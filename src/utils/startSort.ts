import { push } from 'redux-first-history'

interface IStartSort {
  dispatch: Function
  labelURL: string
  emailList: any
  activeEmailListIndex: number
}

const startSort = (props: IStartSort) => {
  const { dispatch, labelURL, emailList, activeEmailListIndex } = props

  if (labelURL && emailList && activeEmailListIndex > -1) {
    return dispatch(
      push(
        `/mail/${labelURL}/${emailList[activeEmailListIndex].threads[0].id}/messages`
      )
    )
  }
  return null
}

export default startSort
