import { useEffect, useState } from 'react'
import { push } from 'redux-first-history'

import AnimatedMountUnmount from 'components/Elements/AnimatedMountUnmount'
import CustomButton from 'components/Elements/Buttons/CustomButton'
import Stack from 'components/Elements/Stack/Stack'
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

const PRODUCT_NAME = 'Juno'
const COMPANY_TAG = 'By Elysium Labs'
const ENTER_HINT = 'use Enter to start'
const ERROR_LOGIN = 'Unable to use Google login'
const DISCORD_URL = import.meta.env.VITE_DISCORD_SOCIAL_URL
const FORMSPARK_ID = import.meta.env.VITE_FORMSPARK_FORM_ID

const Login = () => {
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()

  const isDisabled =
    loadState === global.LOAD_STATE_MAP.error ||
    loadState === global.LOAD_STATE_MAP.loading
  const isLoading = loadState === global.LOAD_STATE_MAP.loading
  const isError = loadState === global.LOAD_STATE_MAP.error

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

  useEffect(() => {
    let timer: undefined | ReturnType<typeof setTimeout>
    if (isError) {
      timer = setTimeout(() => {
        setLoadState(global.LOAD_STATE_MAP.idle)
      }, 3000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isError])

  return (
    <S.Wrapper>
      <AnimatedMountUnmount>
        <S.LoginWrapper>
          <S.Header>
            <S.LoginHeader>{PRODUCT_NAME}</S.LoginHeader>
            <Stack direction="vertical">
              <S.StyledLink
                href="https://elysiumlabs.io"
                target="_blank"
                rel="noreferrer"
              >
                {COMPANY_TAG}
              </S.StyledLink>
              <Span muted>{global.BETA_VERSION}</Span>
            </Stack>
          </S.Header>
          <S.LoginContainer>
            <S.Inner>
              <div style={{ marginBottom: 'var(--spacing-4)' }} />
              <GoogleButton
                onClick={fetchUrl}
                disabled={isDisabled}
                showLoadingState={isLoading}
              />
              {isError ? (
                <Paragraph
                  muted
                  small
                  style={{ color: 'var(--color-red-500)' }}
                >
                  {ERROR_LOGIN}
                </Paragraph>
              ) : (
                <Paragraph muted small>
                  {ENTER_HINT}
                </Paragraph>
              )}
            </S.Inner>
          </S.LoginContainer>
          <S.AdditionalOptions>
            {DISCORD_URL ? (
              <CustomButton
                onClick={() => window.open(DISCORD_URL, '_blank')}
                icon={<QiArrowRight />}
                title="Open Discord invitation and be welcome!"
                label="Join Discord Community"
                suppressed
              />
            ) : null}
            {FORMSPARK_ID ? (
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
            ) : null}
          </S.AdditionalOptions>
        </S.LoginWrapper>
      </AnimatedMountUnmount>
    </S.Wrapper>
  )
}

export default Login
