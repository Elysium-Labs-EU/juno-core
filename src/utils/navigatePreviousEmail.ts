import { convertArrayToString } from '.'
import { EmailListObject } from '../Store/emailListTypes'

interface NavigatePreviousMailProps {
  history: any
  labelIds: string[]
  emailList?: EmailListObject[]
  emailListIndex?: number
  viewIndex: number
}

const NavigatePreviousMail = (props: NavigatePreviousMailProps) => {
  const { history, labelIds, emailList, emailListIndex, viewIndex } = props

  const labelURL = () => {
    if (labelIds && labelIds.length > 0) {
      return convertArrayToString(labelIds)
    }
    return null
  }

  if (emailList && emailListIndex !== undefined && emailListIndex > -1) {
    const prevID = emailList[emailListIndex].threads[viewIndex - 1].id
    return history.push(`/mail/${labelURL()}/${prevID}/messages`)
  }
  return null
}

export default NavigatePreviousMail
