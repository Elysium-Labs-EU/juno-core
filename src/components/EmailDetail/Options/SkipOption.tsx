import { useCallback } from 'react'
import { FiSkipForward } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { navigateNextMail, selectInSearch } from '../../../store/utilsSlice'

const actionKeys = [keyConstants.KEY_SHIFT, keyConstants.KEY_K]

const SkipOption = () => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    dispatch(navigateNextMail())
  }, [dispatch])
  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <CustomButton
      icon={<FiSkipForward />}
      label={local.BUTTON_SKIP}
      onClick={handleEvent}
      suppressed
      title="Skip email"
    />
  )
}

export default SkipOption
