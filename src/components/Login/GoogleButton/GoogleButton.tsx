import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import * as S from './GoogleButtonStyles'
import useKeyPress from '../../../Hooks/useKeyPress'
import * as global from '../../../constants/globalConstants'

const GOOGLE = 'Login with Google'
interface IGoogleButton {
  disabled: boolean
  onClick: Function
}

const GoogleButton = ({ renderProps }: { renderProps: IGoogleButton }) => {
  const EnterListener = useKeyPress(global.KEY_ENTER)

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
