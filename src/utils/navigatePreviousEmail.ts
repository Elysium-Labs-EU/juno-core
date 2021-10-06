import { convertArrayToString } from '.'
import { EmailListObject } from '../Store/emailListTypes'

interface NavigatePreviousMailProps {
  history: any
  labelIds: string[]
  emailList?: EmailListObject[]
  emailListIndex?: number
  viewIndexState: number
  currentViewListener?: any
}

const NavigatePreviousMail = (props: NavigatePreviousMailProps) => {
  const {
    history,
    labelIds,
    emailList,
    emailListIndex,
    viewIndexState,
    currentViewListener,
  } = props

  currentViewListener && currentViewListener(-1)

  const labelURL = () => {
    if (labelIds && labelIds.length > 0) {
      return convertArrayToString(labelIds)
    }
    return null
  }

  if (
    emailList &&
    emailListIndex !== undefined &&
    emailListIndex > -1 &&
    labelURL() !== null
  ) {
    const prevID = emailList[emailListIndex].threads[viewIndexState - 1].id
    return history.push(`/mail/${labelURL()}/${prevID}/messages`)
  }
  return null
}

export default NavigatePreviousMail
