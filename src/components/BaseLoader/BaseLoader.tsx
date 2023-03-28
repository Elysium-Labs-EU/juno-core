import { useEffect } from 'react'
import { useToasterStore } from 'react-hot-toast'

import * as S from 'components/BaseLoader/BaseLoaderStyles'
import { handleLogout } from 'components/MainHeader/Navigation/More/Options/LogoutOption'
import useCountDownTimer from 'hooks/useCountDownTimer'

import ErrorNotification from './ErrorNotification'
import LoadingComponent from './LoadingComponent'

const Baseloader = () => {
  const { countDown } = useCountDownTimer({ startSeconds: 8 })
  const { toasts } = useToasterStore()

  const hasErrorToast = toasts.some((toast) => toast.type === 'error')

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
        <LoadingComponent hasErrorToast={hasErrorToast} />
        <ErrorNotification
          countDown={countDown}
          hasErrorToast={hasErrorToast}
        />
      </S.Inner>
    </S.Wrapper>
  )
}

export default Baseloader
