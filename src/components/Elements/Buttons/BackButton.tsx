import { useCallback } from 'react'
import CustomButton from './CustomButton'
import * as global from '../../../constants/globalConstants'
import * as keyConstants from '../../../constants/keyConstants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { navigateBack } from '../../../store/utilsSlice'
import { selectCoreStatus } from '../../../store/emailDetailSlice'
import { QiChevronLeft } from '../../../images/svgIcons/quillIcons'

const actionKeys = [keyConstants.KEY_SPECIAL.escape]

const BackButton = () => {
  const coreStatus = useAppSelector(selectCoreStatus)
  const dispatch = useAppDispatch()

  const handleEvent = useCallback(() => {
    dispatch(navigateBack())
  }, [coreStatus, dispatch])

  useMultiKeyPress(handleEvent, actionKeys)

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
