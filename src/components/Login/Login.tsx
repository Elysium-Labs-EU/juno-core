import { useState } from 'react'
import { push } from 'redux-first-history'
// import isElectron from 'is-electron'
import * as S from './LoginStyles'
import * as GS from '../../styles/globalStyles'
import * as global from '../../constants/globalConstants'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import GoogleButton from './GoogleButton/GoogleButton'
import userApi from '../../data/userApi'
import { QiArrowRight } from '../../images/svgIcons/quillIcons'
import CustomButton from '../Elements/Buttons/CustomButton'
import BetaAccesForm from './BetaAccessForm/BetaAccessForm'
import { useAppDispatch } from '../../store/hooks'
import { setSystemStatusUpdate } from '../../store/utilsSlice'

// const SUB_HEADER = 'To get started'
const ENTER_HINT = 'use Enter to start'
const ERROR_LOGIN = 'Unable use Google login'

const Login = () => {
  const dispatch = useAppDispatch()
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [betaFormOpen, setBetaFormOpen] = useState(false)

  const fetchUrl = async () => {
    try {
      setLoadState(global.LOAD_STATE_MAP.loading)
      // A flag that can be set via the .env variable. If this is set, and witht the value of true, the auth mechanism will be changed.
      const response = await userApi().authGoogle(
        import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'true'
      )
      if (response?.status === 200 && response?.data) {
        dispatch(push(response.data))
      } else {
        setLoadState(global.LOAD_STATE_MAP.error)
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: ERROR_LOGIN,
          })
        )
      }
    } catch (err) {
      setLoadState(global.LOAD_STATE_MAP.error)
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: ERROR_LOGIN,
        })
      )
    }
  }

  return (
    <S.Wrapper>
      <AnimatedMountUnmount>
        <S.Header>
          <S.LoginHeader>Juno</S.LoginHeader>
          <S.SubHeaderContainer>
            <S.StyledLink
              href="https://elysiumlabs.io"
              target="_blank"
              rel="noreferrer"
            >
              By Elysium Labs
            </S.StyledLink>
            <GS.TextMutedSpan>Private Beta</GS.TextMutedSpan>
          </S.SubHeaderContainer>
        </S.Header>
        <S.LoginContainer>
          <S.Inner>
            <div style={{ marginBottom: '40px' }} />
            <GoogleButton
              renderProps={{
                onClick: fetchUrl,
                disabled:
                  loadState === global.LOAD_STATE_MAP.error ||
                  loadState === global.LOAD_STATE_MAP.loading,
              }}
            />
            <GS.TextMutedSmall>{ENTER_HINT}</GS.TextMutedSmall>
          </S.Inner>
        </S.LoginContainer>
        <S.AdditionalOptions>
          <CustomButton
            onClick={() =>
              window.open(import.meta.env.VITE_DISCORD_SOCIAL_URL, '_blank')
            }
            icon={<QiArrowRight />}
            title="Open Discord invitation and be welcome!"
            label="Join Discord Community"
            suppressed
          />
          {import.meta.env.VITE_FORMSPARK_FORM_ID && (
            <>
              <CustomButton
                onClick={() => setBetaFormOpen(true)}
                icon={<QiArrowRight />}
                title="Show beta form to request access"
                label="Request beta access"
                suppressed
              />
              {betaFormOpen && (
                <BetaAccesForm
                  betaFormOpen={betaFormOpen}
                  setBetaFormOpen={setBetaFormOpen}
                />
              )}
            </>
          )}
        </S.AdditionalOptions>
      </AnimatedMountUnmount>
    </S.Wrapper>
  )
}

export default Login
