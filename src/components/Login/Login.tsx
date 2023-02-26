import { useState } from 'react'
import { push } from 'redux-first-history'

import AnimatedMountUnmount from 'components/Elements/AnimatedMountUnmount'
import CustomButton from 'components/Elements/Buttons/CustomButton'
import * as global from 'constants/globalConstants'
import userApi from 'data/userApi'
import { QiArrowRight } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectActiveModal,
  setActiveModal,
  setSystemStatusUpdate,
} from 'store/utilsSlice'
import { Paragraph, Span } from 'styles/globalStyles'

import BetaAccesForm from './BetaAccessForm/BetaAccessForm'
import GoogleButton from './GoogleButton/GoogleButton'
import * as S from './LoginStyles'

// const SUB_HEADER = 'To get started'
const ENTER_HINT = 'use Enter to start'
const ERROR_LOGIN = 'Unable use Google login'

const Login = () => {
  const dispatch = useAppDispatch()
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const activeModal = useAppSelector(selectActiveModal)

  const fetchUrl = async () => {
    try {
      setLoadState(global.LOAD_STATE_MAP.loading)
      // A flag that can be set via the .env variable. If this is set, and witht the value of true, the auth mechanism will be changed.
      const response = await userApi().authGoogle(
        import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'true'
      )
      if (
        'status' in response &&
        response?.status === 200 &&
        'data' in response
      ) {
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
            <Span muted>{global.BETA_VERSION}</Span>
          </S.SubHeaderContainer>
        </S.Header>
        <S.LoginContainer>
          <S.Inner>
            <div style={{ marginBottom: '40px' }} />
            <GoogleButton
              onClick={fetchUrl}
              disabled={
                loadState === global.LOAD_STATE_MAP.error ||
                loadState === global.LOAD_STATE_MAP.loading
              }
              showLoadingState={loadState === global.LOAD_STATE_MAP.loading}
            />
            <Paragraph muted small>
              {ENTER_HINT}
            </Paragraph>
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
                onClick={() =>
                  dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.betaAccess))
                }
                icon={<QiArrowRight />}
                title="Show beta form to request access"
                label="Request beta access"
                suppressed
              />
              {activeModal === global.ACTIVE_MODAL_MAP.betaAccess && (
                <BetaAccesForm />
              )}
            </>
          )}
        </S.AdditionalOptions>
      </AnimatedMountUnmount>
    </S.Wrapper>
  )
}

export default Login
