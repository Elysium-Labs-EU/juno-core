import { push } from 'redux-first-history'
import { convertArrayToString } from '.'
import { setViewIndex } from '../Store/emailDetailSlice'
import { EmailListObject } from '../Store/emailListTypes'

interface NavigatePreviousMailProps {
  labelIds: string[]
  emailList?: EmailListObject[]
  emailListIndex?: number
  viewIndex: number
  dispatch: any
}

const NavigatePreviousMail = (props: NavigatePreviousMailProps) => {
  const { labelIds, emailList, emailListIndex, viewIndex, dispatch } = props

  const labelURL = () => {
    if (labelIds && labelIds.length > 0) {
      return convertArrayToString(labelIds)
    }
    return null
  }

  dispatch(setViewIndex(viewIndex - 1))

  if (
    emailList &&
    emailListIndex !== undefined &&
    emailListIndex > -1 &&
    labelURL() !== null
  ) {
    const prevID = emailList[emailListIndex].threads[viewIndex - 1].id
    return dispatch(push(`/mail/${labelURL()}/${prevID}/messages`))
  }
  return null
}

export default NavigatePreviousMail
