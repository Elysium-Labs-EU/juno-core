import { useCallback } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import CustomButton from './CustomButton'
import * as global from '../../../constants/globalConstants'
import { selectCoreStatus } from '../../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectComposeEmail } from '../../../Store/composeSlice'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'
import { navigateBack } from '../../../Store/utilsSlice'

const actionKeys = [global.KEY_ESCAPE]

const BackButton = () => {
  const coreStatus = useAppSelector(selectCoreStatus)
  const dispatch = useAppDispatch()
  const composeEmail = useAppSelector(selectComposeEmail)

  const handleEvent = useCallback(() => {
    dispatch(navigateBack())
  }, [coreStatus, composeEmail, dispatch])

  useMultiKeyPress(handleEvent, actionKeys)

  return (
    <CustomButton
      onClick={handleEvent}
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
