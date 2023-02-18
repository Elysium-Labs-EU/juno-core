import { CORE_STATUS_MAP } from 'constants/globalConstants'
import { setCoreStatus, setSessionViewIndex } from 'store/emailDetailSlice'
import type { AppDispatch } from 'store/store'
import type { TEmailListState } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import labelURL from 'utils/createLabelURL'
import startSort from 'utils/startSort'

interface IActivateTodo {
  activeEmailListIndex: TEmailListState['activeEmailListIndex']
  dispatch: AppDispatch
  emailList: TEmailListState['emailList']
  labelIds: TLabelState['labelIds']
  selectedEmails?: TEmailListState['selectedEmails']
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
