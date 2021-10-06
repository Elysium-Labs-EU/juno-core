import { convertArrayToString } from '.'
import { EmailListObject } from '../Store/emailListTypes'

interface NavigateNextMailProps {
  history: any
  labelIds: string[]
  emailList?: EmailListObject[]
  emailListIndex?: number
  filteredCurrentEmailList?: any
  viewIndexState: number
  currentViewListener?: any
}

const NavigateNextMail = (props: NavigateNextMailProps) => {
  const {
    history,
    labelIds,
    emailList,
    emailListIndex,
    filteredCurrentEmailList,
    viewIndexState,
    currentViewListener,
  } = props
  currentViewListener && currentViewListener(1)

  const activeEmailList = () => {
    if (filteredCurrentEmailList) {
      return filteredCurrentEmailList
    }
    if (emailList && emailListIndex !== undefined && emailListIndex > -1) {
      return emailList[emailListIndex]
    }
    return null
  }

  const labelURL = () => {
    if (labelIds && labelIds.length > 0) {
      return convertArrayToString(labelIds)
    }
    return null
  }

  if (activeEmailList() !== null && labelURL() !== null) {
    const nextID = activeEmailList().threads[viewIndexState + 1].id
    return history.push(`/mail/${labelURL()}/${nextID}/messages`)
  }
  return null
}

export default NavigateNextMail
