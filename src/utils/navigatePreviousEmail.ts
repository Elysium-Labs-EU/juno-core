import { push } from 'redux-first-history'
import { convertArrayToString } from '.'
import { setViewIndex } from '../Store/emailDetailSlice'
import { EmailListObject } from '../Store/emailListTypes'

interface NavigatePreviousMailProps {
  labelIds: string[]
  activeEmailList?: EmailListObject
  viewIndex: number
  dispatch: any
}

const NavigatePreviousMail = (props: NavigatePreviousMailProps) => {
  const { labelIds, activeEmailList, viewIndex, dispatch } = props

  const labelURL = () => {
    if (labelIds && labelIds.length > 0) {
      return convertArrayToString(labelIds)
    }
    return null
  }

  dispatch(setViewIndex(viewIndex - 1))

  const staticLabelURL = labelURL()

  if (activeEmailList && staticLabelURL !== null) {
    const prevID = activeEmailList.threads[viewIndex - 1].id
    return dispatch(push(`/mail/${staticLabelURL}/${prevID}/messages`))
  }
  return null
}

export default NavigatePreviousMail
