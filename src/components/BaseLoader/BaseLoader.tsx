import { useEffect } from 'react'

import * as S from 'components/BaseLoader/BaseLoaderStyles'
import { handleLogout } from 'components/MainHeader/Navigation/More/Options/LogoutOption'
import useCountDownTimer from 'hooks/useCountDownTimer'
import { selectBaseError, setBaseError } from 'store/baseSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import { EIGHT_SECONDS_BEFORE_LOGOUT } from './BaseLoaderConstants'
import ErrorNotification from './ErrorNotification'
import LoadingComponent from './LoadingComponent'

const Baseloader = () => {
  const baseError = useAppSelector(selectBaseError)
  const { countDown } = useCountDownTimer({
    startSeconds: EIGHT_SECONDS_BEFORE_LOGOUT,
  })
  const dispatch = useAppDispatch()

  const hasError = Boolean(baseError)

  useEffect(() => {
    if (baseError && countDown === 1) {
      dispatch(setBaseError(null))
    }
    if (countDown === 0) {
      handleLogout()
    }
  }, [baseError, countDown])

  return (
    <S.Wrapper data-testid="base-loader">
      <S.Inner>
        <LoadingComponent hasError={hasError} />
        <ErrorNotification
          baseError={baseError}
          countDown={countDown}
          hasError={hasError}
        />
      </S.Inner>
    </S.Wrapper>
  )
}

export default Baseloader
