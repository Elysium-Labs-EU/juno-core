import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import '../MainHeader/Navigation/NavControls.scss'
import * as local from '../../constants/draftConstants'
import * as S from '../MainHeader/HeaderStyles'
import BackButton from '../BackButton'
import * as GS from '../../styles/globalStyles'

const InboxHeader = () => {
  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <BackButton />
        <div className="header-center">
          <h2>{local.DRAFT_HEADER}</h2>
        </div>
        <NavControls />
      </S.NavContainer>
    </GS.OuterContainer>
  )
}

export default InboxHeader
