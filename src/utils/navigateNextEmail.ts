import { push } from 'redux-first-history'
import { setViewIndex } from '../Store/emailDetailSlice'
import { IEmailListObject } from '../Store/emailListTypes'
import labelURL from './createLabelURL'

interface INavigateNextMail {
  labelIds: string[]
  activeEmailList?: IEmailListObject
  viewIndex: number
  dispatch: Function
}

const navigateNextMail = (props: INavigateNextMail) => {
  const { labelIds, activeEmailList, viewIndex, dispatch } = props

  const selectActiveEmailList = () => {
    if (activeEmailList) {
      return activeEmailList
    }
    return null
  }

  dispatch(setViewIndex(viewIndex + 1))

  const staticLabelURL = labelURL(labelIds)
  const staticActiveEmailList = selectActiveEmailList()

  if (staticActiveEmailList !== null && staticLabelURL !== null) {
    const nextID = staticActiveEmailList.threads[viewIndex + 1].id
    return dispatch(push(`/mail/${staticLabelURL}/${nextID}/messages`))
  }
  return null
}

export default navigateNextMail
