import { goBack, push } from 'redux-first-history'
import RouteConstants from '../constants/routes.json'
import * as global from '../constants/globalConstants'
import { setCoreStatus } from '../Store/emailListSlice'
import { resetDraftDetails } from '../Store/draftsSlice'
import { resetComposeEmail } from '../Store/composeSlice'

interface INavigateBack {
  coreStatus: string | null
  composeEmail: any
  dispatch: Function
}

const cleanUpComposerAndDraft = (dispatch: Function) => {
  dispatch(resetComposeEmail())
  dispatch(resetDraftDetails())
}

const navigateBack = ({
  coreStatus,
  composeEmail,
  dispatch,
}: INavigateBack) => {
  if (!coreStatus) {
    if (Object.keys(composeEmail).length > 0) {
      cleanUpComposerAndDraft(dispatch)
    }
    dispatch(goBack())
    return
  }
  if (coreStatus === global.CORE_STATUS_FOCUSED) {
    dispatch(push(RouteConstants.HOME))
    return
  }
  if (coreStatus === global.CORE_STATUS_SORTING) {
    dispatch(push(RouteConstants.INBOX))
    return
  }
  dispatch(setCoreStatus(null))
}

export default navigateBack
