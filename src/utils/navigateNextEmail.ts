import { push } from 'redux-first-history'
import { convertArrayToString } from '.'
import { setViewIndex } from '../Store/emailDetailSlice'
import { EmailListObject } from '../Store/emailListTypes'

interface NavigateNextMailProps {
  labelIds: string[]
  emailList?: EmailListObject[]
  emailListIndex?: number
  filteredCurrentEmailList?: any
  viewIndex: number
  dispatch: any
}

const NavigateNextMail = (props: NavigateNextMailProps) => {
  const {
    labelIds,
    emailList,
    emailListIndex,
    filteredCurrentEmailList,
    viewIndex,
    dispatch,
  } = props

  const activeEmailList = () => {
    if (filteredCurrentEmailList) {
      return filteredCurrentEmailList[0]
    }
    if (emailList && emailListIndex !== undefined && emailListIndex > -1) {
      return emailList[emailListIndex]
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

  if (activeEmailList() !== null && labelURL() !== null) {
    const nextID = activeEmailList().threads[viewIndex + 1].id
    return dispatch(push(`/mail/${labelURL()}/${nextID}/messages`))
  }
  return null
}

export default NavigateNextMail
