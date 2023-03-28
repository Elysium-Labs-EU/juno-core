import * as S from 'components/BaseLoader/BaseLoaderStyles'
import LogoutOption from 'components/MainHeader/Navigation/More/Options/LogoutOption'

import { REDIRECTED, SECONDS } from './BaseLoaderConstants'
import type { IErrorNotification } from './BaseLoaderTypes'

const ErrorNotification = ({
  countDown,
  hasErrorToast,
}: IErrorNotification) => {
  if (hasErrorToast) {
    // const toastError = toasts.find((toast) => toast.type === 'error')?.message
    // let errorMessage = '';

    // if (toastError && typeof toastError !== 'string' && typeof toastError.message !== 'string' && typeof toastError.message !== 'undefined') {
    //   errorMessage = resolveValue(toastError.message, toastError) as string;
    // }
    return (
      <>
        {/* <S.ServiceUnavailableParagraph>
            {toasts.find((toast) => toast.type === 'error')?.message}
          </S.ServiceUnavailableParagraph> */}
        <S.ServiceUnavailableParagraph>
          {REDIRECTED}
          {countDown}
          {SECONDS}
        </S.ServiceUnavailableParagraph>
        <LogoutOption asRegularButton />
      </>
    )
  }
  return null
}

export default ErrorNotification
