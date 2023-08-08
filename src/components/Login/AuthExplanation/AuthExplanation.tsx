import { useLocation } from 'react-router-dom'
import { push } from 'redux-first-history'

import AnimatedMountUnmount from 'components/Elements/AnimatedMountUnmount'
import CustomButton from 'components/Elements/Buttons/CustomButton'
import Stack from 'components/Elements/Stack/Stack'
import { AUTH_SCREEN_ACCEPTED } from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import RoutesConstants from 'constants/routesConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import GmailLogo from 'images/Gmail_logo.png'
import Logo from 'images/Juno_logo_dark.png'
import { QiArrowRight, QiEscape, QiJump } from 'images/svgIcons/quillIcons'
import { useAppDispatch } from 'store/hooks'
import { Base, Paragraph, Span } from 'styles/globalStyles'

import {
  AUTH_HEADER,
  PRIVACY_NOTICE,
  STEP_ARRAY,
} from './AuthExplanationConstants'
import * as S from './AuthExplanationStyles'

const AuthExplanation = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const googleUrlFromState = () => {
    const locationState = location.state as unknown
    if (!(locationState instanceof Object)) {
      return null
    }
    return 'googleURL' in locationState && typeof locationState.googleURL === 'string' ? locationState.googleURL : ''
  }

  const googleURL = googleUrlFromState()

  const handleContinueToGoogle = () => {
    localStorage.setItem(AUTH_SCREEN_ACCEPTED, 'true')
    dispatch(push(googleURL))
  }
  const handlePageBack = () => {
    dispatch(push(RoutesConstants.LOGIN))
  }

  useKeyboardShortcut({
    handleEvent: handleContinueToGoogle,
    key: keyConstants.KEY_SPECIAL.enter,
  })

  useKeyboardShortcut({
    handleEvent: handlePageBack,
    key: keyConstants.KEY_SPECIAL.escape,
  })

  return (
    <Base>
      <S.ContentWrapper>
        <AnimatedMountUnmount>
          <S.ContentContainer>
            <S.StyledStack justify="center" align="center">
              <S.Image src={GmailLogo} alt="Gmail logo" />
              <QiJump color="var(--color-neutral-600)" size={25} />
              <S.Image src={Logo} alt="Juno logo" />
            </S.StyledStack>
            <S.StyledStack direction="vertical" spacing="huge">
              <S.StyledH1>{AUTH_HEADER}</S.StyledH1>

              <div>
                {STEP_ARRAY.map((STEP, index) => (
                  <Span key={STEP} extraBold={index === 1}>
                    {STEP}
                  </Span>
                ))}
              </div>
              <Paragraph>{PRIVACY_NOTICE}</Paragraph>
            </S.StyledStack>
            <Stack justify="end">
              <CustomButton
                icon={<QiEscape />}
                label="No thanks"
                onClick={handlePageBack}
                suppressed
                title="Return"
              />
              <Stack>
                <CustomButton
                  attention
                  disabled={!googleURL}
                  icon={<QiArrowRight />}
                  label="Continue"
                  onClick={handleContinueToGoogle}
                  title={
                    googleURL ? 'Continue to Juno' : 'We have no target page'
                  }
                />
              </Stack>
            </Stack>
          </S.ContentContainer>
        </AnimatedMountUnmount>
      </S.ContentWrapper>
    </Base>
  )
}

export default AuthExplanation
