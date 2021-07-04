import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import * as S from '../MainHeader/HeaderStyles'
import BackButton from '../BackButton'

const SENT_HEADER = 'Sent'

const SentHeader = () => {
  return (
    <div className="tlOuterContainer">
      <S.NavContainer>
        <BackButton />
        <div className="header-center">
          <h2>{SENT_HEADER}</h2>
        </div>
        <NavControls />
      </S.NavContainer>
    </div>
  )
}

export default SentHeader
