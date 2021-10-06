import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import BackButton from '../BackButton'

const SENT_HEADER = 'Sent'

const SentHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <BackButton />
      <div className="header-center">
        <h2>{SENT_HEADER}</h2>
      </div>
      <NavControls />
    </S.NavContainer>
  </GS.OuterContainer>
)

export default SentHeader
