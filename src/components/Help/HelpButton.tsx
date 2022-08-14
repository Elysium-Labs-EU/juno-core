import { useCallback } from 'react'
import { FiInfo } from 'react-icons/fi'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectInSearch, setActiveModal } from '../../store/utilsSlice'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import * as S from './HelpStyles'
import { setModifierKey } from '../../utils/setModifierKey'
import StyledTooltip from '../Elements/StyledTooltip'

const SIZE = 16
const BUTTON_TITLE = 'Feedback and help'

const actionKeysKeyboard = [setModifierKey, keyConstants.KEY_FORWARD_SLASH]
const actionKeysFeedback = [setModifierKey, keyConstants.KEY_DOT]

const customStyles = {
  background: 'var(--color-white)',
  padding: '10px 12px',
  borderRadius: '4px',
  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 10px`,
  lineHeight: 1,
  border: '1px solid var(--color-grey-ultra-light)',
}

const HelpButton = ({ handleEvent }: { handleEvent: () => void }) => {
  const inSearch = useAppSelector(selectInSearch)
  const dispatch = useAppDispatch()


  const handleShowKeyboardShortcuts = useCallback(() => {
    dispatch((setActiveModal(global.ACTIVE_MODAL_MAP.keyboard)))
  }, [dispatch])
  useMultiKeyPress(handleShowKeyboardShortcuts, actionKeysKeyboard, inSearch)

  const handleShowFeedback = useCallback(() => {
    dispatch((setActiveModal(global.ACTIVE_MODAL_MAP.feedback)))
  }, [dispatch])
  useMultiKeyPress(handleShowFeedback, actionKeysFeedback, inSearch)

  return (
    <StyledTooltip title={BUTTON_TITLE}>
      <S.StartButtonWrapper>
        <CustomIconButton
          icon={<FiInfo size={SIZE} />}
          onClick={handleEvent}
          style={customStyles}
          title=""
        />
      </S.StartButtonWrapper>
    </StyledTooltip>
  )
}

export default HelpButton
