import { useCallback, useState } from 'react'
import { FiInfo } from 'react-icons/fi'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectInSearch, setShowKeyboardCombos } from '../../store/utilsSlice'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import * as global from '../../constants/globalConstants'
import * as S from './HelpStyles'
// import modifierKey from '../../utils/setModifierKey'
import StyledTooltip from '../Elements/StyledTooltip'
import HelpMenu from './HelpMenu'

const SIZE = 16
const BUTTON_TITLE = 'Feedback and help'

// const actionKeys = [modifierKey, global.KEY_FORWARD_SLASH]

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
  // const [showHelpMenu, setShowHelpMenu] = useState(false)

  // const handleEvent = useCallback(() => {
  //   // dispatch(setShowKeyboardCombos(true))
  //   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     setAnchorEl(event.currentTarget)
  //   }
  // }, [dispatch])

  // const handleEvent = useCallback(() => {
  //   setShowHelpMenu((prevState) => !prevState)
  // }, [showHelpMenu])

  // useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    // <S.Layer id="HEY THERE">

    <StyledTooltip title={BUTTON_TITLE}>
      <S.ButtonWrapper>
        <CustomIconButton
          icon={<FiInfo size={SIZE} />}
          onClick={handleEvent}
          style={customStyles}
          title=""
        />
      </S.ButtonWrapper>
    </StyledTooltip>
    // </S.Layer>
  )
}

export default HelpButton
