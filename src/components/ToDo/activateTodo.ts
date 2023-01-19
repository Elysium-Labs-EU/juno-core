import { CORE_STATUS_MAP } from 'constants/globalConstants'
import { setCoreStatus, setSessionViewIndex } from 'store/emailDetailSlice'
import type { AppDispatch } from 'store/store'
import type { IEmailListState } from 'store/storeTypes/emailListTypes'
import type { ILabelState } from 'store/storeTypes/labelsTypes'
import labelURL from 'utils/createLabelURL'
import startSort from 'utils/startSort'

interface IActivateTodo {
  activeEmailListIndex: IEmailListState['activeEmailListIndex']
  dispatch: AppDispatch
  emailList: IEmailListState['emailList']
  labelIds: ILabelState['labelIds']
  selectedEmails?: IEmailListState['selectedEmails']
}

export default function activateTodo({
  activeEmailListIndex,
  dispatch,
  emailList,
  labelIds,
  selectedEmails,
}: IActivateTodo) {
  const staticLabelURL = labelURL(labelIds)
  if (staticLabelURL) {
    startSort({
      dispatch,
      labelURL: staticLabelURL,
      emailList,
      selectedEmails,
      activeEmailListIndex,
    })
    dispatch(setCoreStatus(CORE_STATUS_MAP.focused))
    dispatch(setSessionViewIndex(0))
  }
}
