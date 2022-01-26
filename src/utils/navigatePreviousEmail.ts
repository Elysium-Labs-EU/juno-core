import { push } from 'redux-first-history'
import { setViewIndex } from '../Store/emailDetailSlice'
import {
  IEmailListObject,
  IEmailListObjectSearch,
} from '../Store/emailListTypes'
import labelURL from './createLabelURL'

interface NavigatePreviousMailProps {
  labelIds: string[]
  activeEmailList?: IEmailListObject | IEmailListObjectSearch
  viewIndex: number
  dispatch: Function
}

const navigatePreviousMail = (props: NavigatePreviousMailProps) => {
  const { labelIds, activeEmailList, viewIndex, dispatch } = props

  dispatch(setViewIndex(viewIndex - 1))

  const staticLabelURL = labelURL(labelIds)

  if (activeEmailList && staticLabelURL !== null) {
    const prevID = activeEmailList.threads[viewIndex - 1].id
    return dispatch(push(`/mail/${staticLabelURL}/${prevID}/messages`))
  }
  return null
}

export default navigatePreviousMail
