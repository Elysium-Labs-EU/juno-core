import { useCallback, useEffect } from 'react'
import { FiInfo } from 'react-icons/fi'
import { Tooltip } from '@mui/material'
import useMultiKeyPress from '../../Hooks/useMultiKeyPress'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import {
  selectInSearch,
  selectShowKeyboardCombos,
  setShowKeyboardCombos,
} from '../../Store/utilsSlice'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import * as global from '../../constants/globalConstants'
import * as S from './HelpStyles'

const SIZE = 16

const customStyles = {
  background: 'var(--color-white-off',
  padding: '0.375rem 0.75rem',
  borderRadius: '0.25rem',
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 10px`,
}

const HelpButton = () => {
  const keysPressed = useMultiKeyPress()
  const inSearch = useAppSelector(selectInSearch)
  const showKeyBoardCombos = useAppSelector(selectShowKeyboardCombos)
  const dispatch = useAppDispatch()

  const handleEvent = useCallback(() => {
    dispatch(setShowKeyboardCombos(true))
  }, [dispatch])

  useEffect(() => {
    let mounted = true
    if (
      mounted &&
      keysPressed.includes(global.KEY_OS) &&
      keysPressed.includes(global.KEY_FORWARD_SLASH) &&
      !inSearch &&
      !showKeyBoardCombos
    ) {
      handleEvent()
    }
    return () => {
      mounted = false
    }
  }, [keysPressed, inSearch, showKeyBoardCombos])

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
