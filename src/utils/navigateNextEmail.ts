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

  console.log(props)

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

  console.log(activeEmailList())

  const labelURL = () => {
    if (labelIds && labelIds.length > 0) {
      // if (labelIds[0] !== emailList[0].labels[0])
      return convertArrayToString(labelIds)
    }
    return null
  }

  // TODO: Unify call based on new activeEmaiList function

  if (filteredCurrentEmailList) {
    const nextID = filteredCurrentEmailList[0].threads[viewIndexState + 1].id
    return history.push(`/mail/${labelURL()}/${nextID}/messages`)
  }
  if (emailList && emailListIndex !== undefined && emailListIndex > -1) {
    const nextID = emailList[emailListIndex].threads[viewIndexState + 1].id
    return history.push(`/mail/${labelURL()}/${nextID}/messages`)
  }
  return null
}

export default NavigateNextMail
