import { useCallback } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import CustomButton from './CustomButton'
import * as global from '../../../constants/globalConstants'
import { selectCoreStatus } from '../../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectComposeEmail } from '../../../Store/composeSlice'
import navigateBack from '../../../utils/navigateBack'
import useKeyCombo from '../../../Hooks/useKeyCombo'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'

const actionKeys = [global.KEY_ESCAPE]

const BackButton = () => {
  const coreStatus = useAppSelector(selectCoreStatus)
  const dispatch = useAppDispatch()
  const composeEmail = useAppSelector(selectComposeEmail)
  const keysPressed = useMultiKeyPress()

  const handleEvent = useCallback(() => {
    navigateBack({ dispatch, coreStatus, composeEmail })
  }, [coreStatus, composeEmail, dispatch])

  useKeyCombo({ handleEvent, keysPressed, actionKeys })

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
