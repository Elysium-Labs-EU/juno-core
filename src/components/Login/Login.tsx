import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { push } from 'redux-first-history'

import AppWrapper from 'components/AppWrapper/AppWrapper'
import AnimatedMountUnmount from 'components/Elements/AnimatedMountUnmount'
import CustomButton from 'components/Elements/Buttons/CustomButton'
import Stack from 'components/Elements/Stack/Stack'
import CustomToast from 'components/Elements/Toast/Toast'
import {
  ACTIVE_MODAL_MAP,
  AUTH_SCREEN_ACCEPTED,
  BETA_VERSION,
  LOAD_STATE_MAP,
} from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import userApi from 'data/userApi'
import { QiArrowRight } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectActiveModal, setActiveModal } from 'store/utilsSlice'
import { Paragraph, Span } from 'styles/globalStyles'

import BetaAccesForm from './BetaAccessForm/BetaAccessForm'
import GoogleButton from './GoogleButton/GoogleButton'
import {
  COMPANY_TAG,
  ENTER_HINT,
  ERROR_LOGIN,
  PRODUCT_NAME,
} from './LoginConstants'
import * as S from './LoginStyles'

const DISCORD_URL = import.meta.env.VITE_DISCORD_SOCIAL_URL
const FORMSPARK_ID = import.meta.env.VITE_FORMSPARK_FORM_ID

const Login = () => {
  const [loadState, setLoadState] = useState(LOAD_STATE_MAP.idle)
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()

  const isDisabled =
    loadState === LOAD_STATE_MAP.error || loadState === LOAD_STATE_MAP.loading
  const isLoading = loadState === LOAD_STATE_MAP.loading
  const isError = loadState === LOAD_STATE_MAP.error

  const fetchUrl = async () => {
    try {
      setLoadState(LOAD_STATE_MAP.loading)
      // A flag that can be set via the .env variable. If this is set, and witht the value of true, the auth mechanism will be changed.
      const response = await userApi().authGoogle(
        import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'true'
      )
      if (
        'status' in response &&
        response?.status === 200 &&
        'data' in response
      ) {
        const authScreenAccepted = localStorage.getItem(AUTH_SCREEN_ACCEPTED)

        if (authScreenAccepted === 'true') {
          dispatch(push(response.data))
        } else {
          dispatch(
            push(RoutesConstants.GOOGLE_AUTH_EXPLANATION, {
              googleURL: response.data,
            })
          )
        }
      } else {
        setLoadState(LOAD_STATE_MAP.error)
        toast.custom((t) => (
          <CustomToast specificToast={t} title={ERROR_LOGIN} variant="error" />
        ))
      }
    } catch (err) {
      setLoadState(LOAD_STATE_MAP.error)
      toast.custom((t) => (
        <CustomToast specificToast={t} title={ERROR_LOGIN} variant="error" />
      ))
    }
  }

  useEffect(() => {
    let timer: undefined | ReturnType<typeof setTimeout>
    if (isError) {
      timer = setTimeout(() => {
        setLoadState(LOAD_STATE_MAP.idle)
      }, 3000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isError])

  return (
    <AppWrapper headerTitle="Login">
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
                <Span muted>{BETA_VERSION}</Span>
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
                      dispatch(setActiveModal(ACTIVE_MODAL_MAP.betaAccess))
                    }
                    icon={<QiArrowRight />}
                    title="Show beta form to request access"
                    label="Request beta access"
                    suppressed
                  />
                  {activeModal === ACTIVE_MODAL_MAP.betaAccess && (
                    <BetaAccesForm />
                  )}
                </>
              ) : null}
            </S.AdditionalOptions>
          </S.LoginWrapper>
        </AnimatedMountUnmount>
      </S.Wrapper>
    </AppWrapper>
  )
}

export default Login
