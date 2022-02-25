import { push } from 'redux-first-history'
import { setViewIndex } from '../Store/emailDetailSlice'
import {
  IEmailListObject,
  IEmailListObjectSearch,
} from '../Store/emailListTypes'
import labelURL from './createLabelURL'
import navigateBack from './navigateBack'

interface INavigateNextMail {
  labelIds: string[]
  activeEmailList?: IEmailListObject | IEmailListObjectSearch
  filteredCurrentEmailList?: any
  viewIndex: number
  dispatch: Function
  coreStatus: string | null
  composeEmail: any
}

const navigateNextMail = (props: INavigateNextMail) => {
  const {
    labelIds,
    activeEmailList,
    filteredCurrentEmailList,
    viewIndex,
    dispatch,
    coreStatus,
    composeEmail,
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

  const staticLabelURL = labelURL(labelIds)
  const staticActiveEmailList = selectActiveEmailList()
  const nextID = staticActiveEmailList.threads[viewIndex + 1]?.id

  if (nextID) {
    return dispatch(push(`/mail/${staticLabelURL}/${nextID}/messages`))
  }
  return navigateBack({ coreStatus, composeEmail, dispatch })
}

export default navigateNextMail
