import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiChevronLeft } from 'images/svgIcons/quillIcons'
import { useCallback } from 'react'
import { selectCoreStatus } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  navigateBack,
  selectActiveModal,
  selectInSearch,
} from 'store/utilsSlice'

import CustomButton from './CustomButton'

const actionKeys = [keyConstants.KEY_SPECIAL.escape]

const BackButton = () => {
  const activeModal = useAppSelector(selectActiveModal)
  const coreStatus = useAppSelector(selectCoreStatus)
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    dispatch(navigateBack())
  }, [coreStatus, dispatch])

  useKeyboardShortcut({
    handleEvent,
    actionKeys,
    isDisabled: Boolean(activeModal) || inSearch,
  })

  return (
    <CustomButton
      onClick={handleEvent}
      label={global.BUTTON_BACK}
      suppressed
      icon={<QiChevronLeft />}
      title="Back"
    />
  )
}

export default BackButton
