import { useCallback } from 'react'
import { FiSkipForward } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { navigateNextMail, selectInSearch } from '../../../store/utilsSlice'

const actionKeys = [global.KEY_SHIFT, global.KEY_K]

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
    />
  )
}

export default SkipOption
