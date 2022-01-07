import { push } from 'redux-first-history'
import { setViewIndex } from '../Store/emailDetailSlice'
import { EmailListObject } from '../Store/emailListTypes'
import labelURL from './createLabelURL'

interface NavigatePreviousMailProps {
  labelIds: string[]
  activeEmailList?: EmailListObject
  viewIndex: number
  dispatch: any
}

const NavigatePreviousMail = (props: NavigatePreviousMailProps) => {
  const { labelIds, activeEmailList, viewIndex, dispatch } = props

  dispatch(setViewIndex(viewIndex - 1))

  const staticLabelURL = labelURL(labelIds)

  if (activeEmailList && staticLabelURL !== null) {
    const prevID = activeEmailList.threads[viewIndex - 1].id
    return dispatch(push(`/mail/${staticLabelURL}/${prevID}/messages`))
  }
  return null
}

export default NavigatePreviousMail
