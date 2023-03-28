import { useState } from 'react'

import * as S from 'components/BaseLoader/BaseLoaderStyles'
import CustomButton from 'components/Elements/Buttons/CustomButton'
import LogoutOption from 'components/MainHeader/Navigation/More/Options/LogoutOption'

import { REDIRECTED, SECONDS, SHOW_CAUSE_BUTTON } from './BaseLoaderConstants'
import type { IErrorNotification } from './BaseLoaderTypes'

const ErrorNotification = ({
  baseError,
  countDown,
  hasError,
}: IErrorNotification) => {
  const [showMore, setShowMore] = useState(false)
  if (hasError) {
    return (
      <>
        <S.ServiceUnavailableParagraph>
          {baseError?.message}
        </S.ServiceUnavailableParagraph>
        {baseError?.cause && !showMore ? (
          <CustomButton
            label={SHOW_CAUSE_BUTTON}
            suppressed
            onClick={() => setShowMore(true)}
          />
        ) : (
          <S.ServiceUnavailableParagraph>
            {baseError?.cause}
          </S.ServiceUnavailableParagraph>
        )}

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
