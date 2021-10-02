import { convertArrayToString } from '.'
import { EmailListObject } from '../Store/emailListTypes'

interface NavigateNextMailProps {
  history: any
  labelIds: string[]
  emailList?: EmailListObject[]
  emailListIndex?: number
  filteredCurrentEmailList?: any
  viewIndex: number
  currentViewListener?: any
}

const NavigateNextMail = (props: NavigateNextMailProps) => {
  const {
    history,
    labelIds,
    emailList,
    emailListIndex,
    filteredCurrentEmailList,
    viewIndex,
    currentViewListener,
  } = props

  currentViewListener(1)

  const labelURL = () => {
    if (labelIds && labelIds.length > 0) {
      return convertArrayToString(labelIds)
    }
    return null
  }

  if (filteredCurrentEmailList) {
    const nextID = filteredCurrentEmailList[0].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL()}/${nextID}/messages`)
  }
  if (emailList && emailListIndex !== undefined && emailListIndex > -1) {
    const nextID = emailList[emailListIndex].threads[viewIndex + 1].id
    return history.push(`/mail/${labelURL()}/${nextID}/messages`)
  }
  return null
}

export default NavigateNextMail
