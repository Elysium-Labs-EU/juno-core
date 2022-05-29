import { FiSkipForward } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'
import { navigateNextMail, selectInSearch } from '../../../Store/utilsSlice'
import modifierKey from '../../../utils/setModifierKey'

const actionKeys = [modifierKey, global.KEY_SHIFT, global.KEY_K]

const SkipOption = () => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = () => {
    dispatch(navigateNextMail())
  }
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
