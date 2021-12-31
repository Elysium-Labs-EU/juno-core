import { push } from 'redux-first-history'
import { convertArrayToString } from '.'
import { setViewIndex } from '../Store/emailDetailSlice'
import { EmailListObject } from '../Store/emailListTypes'

interface INavigateNextMail {
  labelIds: string[]
  activeEmailList?: EmailListObject
  filteredCurrentEmailList?: any
  viewIndex: number
  dispatch: any
}

const NavigateNextMail = (props: INavigateNextMail) => {
  const {
    labelIds,
    activeEmailList,
    filteredCurrentEmailList,
    viewIndex,
    dispatch,
  } = props

  const selectActiveEmailList = () => {
    if (filteredCurrentEmailList) {
      return filteredCurrentEmailList[0]
    }
    if (activeEmailList) {
      return activeEmailList
    }
    return null
  }

  dispatch(setViewIndex(viewIndex + 1))

  const labelURL = () => {
    if (labelIds && labelIds.length > 0) {
      return convertArrayToString(labelIds)
    }
    return null
  }

  const staticActiveEmailList = selectActiveEmailList()

  if (staticActiveEmailList !== null && labelURL() !== null) {
    const nextID = staticActiveEmailList.threads[viewIndex + 1].id
    return dispatch(push(`/mail/${labelURL()}/${nextID}/messages`))
  }
  return null
}

export default NavigateNextMail
