import { useEffect } from 'react'

import * as S from 'components/BaseLoader/BaseLoaderStyles'
import AnimatedMountUnmount from 'components/Elements/AnimatedMountUnmount'
import LogoutOption, {
  handleLogout,
} from 'components/MainHeader/Navigation/More/Options/LogoutOption'
import { BETA_VERSION } from 'constants/globalConstants'
import useCountDownTimer from 'hooks/useCountDownTimer'
import Logo from 'images/Juno_logo_dark.png'
import { useAppSelector } from 'store/hooks'
import { selectSystemStatusUpdate } from 'store/utilsSlice'
import { Span } from 'styles/globalStyles'

import { LOGO_ALT, REDIRECTED, SECONDS } from './BaseLoaderConstants'

const Baseloader = () => {
  const systemStatusUpdate = useAppSelector(selectSystemStatusUpdate)
  const { countDown } = useCountDownTimer({ startSeconds: 8 })

  useEffect(() => {
    let mounted = true
    if (mounted && countDown === 0) {
      handleLogout()
    }
    return () => {
      mounted = false
    }
  }, [countDown])

  return (
    <S.Wrapper data-testid="base-loader">
      <S.Inner>
        {!systemStatusUpdate && (
          <>
            <AnimatedMountUnmount>
              <S.Container>
                <img
                  style={{ marginBottom: 'var(--spacing-2)' }}
                  src={Logo}
                  alt={LOGO_ALT}
                />
              </S.Container>
            </AnimatedMountUnmount>
            <S.LoaderContainer>
              <S.StyledLinearProgress />
            </S.LoaderContainer>
            <Span muted>{BETA_VERSION}</Span>
          </>
        )}
        {systemStatusUpdate && systemStatusUpdate.type === 'error' && (
          <>
            <S.ServiceUnavailableParagraph>
              {systemStatusUpdate.message}
            </S.ServiceUnavailableParagraph>
            <S.ServiceUnavailableParagraph>
              {REDIRECTED}
              {countDown}
              {SECONDS}
            </S.ServiceUnavailableParagraph>
            <LogoutOption asRegularButton />
          </>
        )}
      </S.Inner>
    </S.Wrapper>
  )
}

export default Baseloader
