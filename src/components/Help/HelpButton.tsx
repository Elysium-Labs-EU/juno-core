import { useCallback } from 'react'
import { FiInfo } from 'react-icons/fi'
import useMultiKeyPress from '../../Hooks/useMultiKeyPress'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectInSearch, setShowKeyboardCombos } from '../../Store/utilsSlice'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import * as global from '../../constants/globalConstants'
import * as S from './HelpStyles'
import modifierKey from '../../utils/setModifierKey'
import StyledTooltip from '../Elements/StyledTooltip'

const SIZE = 16

const actionKeys = [modifierKey, global.KEY_FORWARD_SLASH]

const customStyles = {
  background: 'var(--color-white)',
  padding: '10px 12px',
  borderRadius: '4px',
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 10px`,
  lineHeight: 1,
  border: '1px solid var(--color-grey-ultra-light)',
}

const HelpButton = () => {
  const inSearch = useAppSelector(selectInSearch)
  const dispatch = useAppDispatch()

  const handleEvent = useCallback(() => {
    dispatch(setShowKeyboardCombos(true))
  }, [dispatch])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <StyledTooltip title="Keyboard combos">
      <S.ButtonWrapper>
        <CustomIconButton
          icon={<FiInfo size={SIZE} />}
          onClick={handleEvent}
          style={customStyles}
        />
      </S.ButtonWrapper>
    </StyledTooltip>
  )
}

export default HelpButton
