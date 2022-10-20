import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import * as S from './GoogleButtonStyles'
import useKeyPress from '../../../hooks/useKeyPress'
import * as keyConstants from '../../../constants/keyConstants'

const GOOGLE = 'Login with Google'
interface IGoogleButton {
  disabled: boolean
  onClick: () => void
}

/**
 * @component GoogleButton
 * @param {object} - takes in render props, that contain an onClick handler and the disabled state.
 * @returns a styled Google button that is either disabled or active.
 */

const GoogleButton = ({ renderProps }: { renderProps: IGoogleButton }) => {
  const EnterListener = useKeyPress(keyConstants.keyConstants.KEY_LETTERS.ENTER)

  useEffect(() => {
    let mounted = true
    if (
      EnterListener &&
      !renderProps.disabled &&
      renderProps.onClick &&
      mounted
    ) {
      renderProps.onClick()
    }
    return () => {
      mounted = false
    }
  }, [EnterListener, renderProps])

  return (
    <S.StyledButton
      onClick={() => renderProps.onClick()}
      disabled={renderProps.disabled}
      type="button"
      isActive={EnterListener}
    >
      <S.IconContainer>
        <FcGoogle size={20} />
      </S.IconContainer>
      {GOOGLE}
    </S.StyledButton>
  )
}

export default GoogleButton
