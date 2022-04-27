import { useCallback } from 'react'
import { FiInfo } from 'react-icons/fi'
import { Tooltip } from '@mui/material'
import useMultiKeyPress from '../../Hooks/useMultiKeyPress'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectInSearch, setShowKeyboardCombos } from '../../Store/utilsSlice'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import * as global from '../../constants/globalConstants'
import * as S from './HelpStyles'
import getUserAgent from '../../utils/getUserAgent'

const SIZE = 16
const modifierKey =
  getUserAgent() === global.MAC_OS ? global.KEY_OS : global.KEY_CONTROL
const actionKeys = [modifierKey, global.KEY_FORWARD_SLASH]

const customStyles = {
  background: 'var(--color-white-off',
  padding: '0.375rem 0.75rem',
  borderRadius: '0.25rem',
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 10px`,
}

const HelpButton = () => {
  const inSearch = useAppSelector(selectInSearch)
  const dispatch = useAppDispatch()

  const handleEvent = useCallback(() => {
    dispatch(setShowKeyboardCombos(true))
  }, [dispatch])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <Tooltip title="Keyboard combos">
      <S.ButtonWrapper>
        <CustomIconButton
          icon={<FiInfo size={SIZE} />}
          onClick={handleEvent}
          style={customStyles}
        />
      </S.ButtonWrapper>
    </Tooltip>
  )
}

export default HelpButton
