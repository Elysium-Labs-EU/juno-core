import { FcGoogle } from 'react-icons/fc'

import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'

import * as S from './GoogleButtonStyles'

const GOOGLE = 'Login with Google'

interface IGoogleButton {
  disabled: boolean
  onClick: () => void
  showLoadingState: boolean
}

/**
 * @component GoogleButton
 * @param {object} - takes in render props, that contain an onClick handler and the disabled state.
 * @returns a styled Google button that is either disabled or active.
 */

const GoogleButton = ({
  disabled,
  onClick,
  showLoadingState,
}: IGoogleButton) => {
  useKeyboardShortcut({
    handleEvent: () => onClick(),
    key: keyConstants.KEY_SPECIAL.enter,
    isDisabled: disabled,
  })

  return (
    <S.StyledButton
      onClick={() => onClick()}
      disabled={disabled}
      type="button"
      isActive={disabled}
      showLoadingState={showLoadingState}
    >
      <S.IconContainer>
        <FcGoogle size={20} />
      </S.IconContainer>
      {GOOGLE}
    </S.StyledButton>
  )
}

export default GoogleButton
