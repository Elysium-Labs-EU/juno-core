import { FiChevronLeft } from 'react-icons/fi'
import { goBack, push } from 'redux-first-history'
import CustomButton from './CustomButton'
import * as global from '../../../constants/globalConstants'
import Routes from '../../../constants/routes.json'
import { setCoreStatus } from '../../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import {
  resetComposeEmail,
  selectComposeEmail,
} from '../../../Store/composeSlice'
import { resetDraftDetails } from '../../../Store/draftsSlice'

interface BackButtonType {
  coreStatus?: string | null
}

const BackButton = ({ coreStatus }: BackButtonType) => {
  const dispatch = useAppDispatch()
  const composeEmail = useAppSelector(selectComposeEmail)

  const cleanUpComposerAndDraft = () => {
    dispatch(resetComposeEmail())
    dispatch(resetDraftDetails())
  }

  const navigateBack = () => {
    if (!coreStatus) {
      if (Object.keys(composeEmail).length > 0) {
        cleanUpComposerAndDraft()
      }
      dispatch(goBack())
      return
    }
    if (coreStatus === global.CORE_STATUS_FOCUSED) {
      dispatch(push(Routes.HOME))
    }
    if (coreStatus === global.CORE_STATUS_SORTING) {
      dispatch(push(Routes.INBOX))
    }
    dispatch(setCoreStatus(null))
  }

  return (
    <CustomButton
      onClick={navigateBack}
      label={global.BUTTON_BACK}
      suppressed
      icon={<FiChevronLeft />}
    />
  )
}

export default BackButton

BackButton.defaultProps = {
  coreStatus: null,
}
