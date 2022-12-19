import { useCallback } from 'react'

import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiChevronLeft } from 'images/svgIcons/quillIcons'
import { selectCoreStatus } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  navigateBack,
  selectActiveModal,
  selectInSearch,
} from 'store/utilsSlice'

import CustomButton from './CustomButton'

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
    key: keyConstants.KEY_SPECIAL.escape,
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
