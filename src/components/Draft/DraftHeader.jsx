import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import '../MainHeader/Navigation/NavControls.scss'
import * as local from '../../constants/draftConstants'
import * as S from '../MainHeader/HeaderStyles'
import BackButton from '../BackButton'

const InboxHeader = () => {
  return (
    <div className="tlOuterContainer">
      <S.NavContainer>
        <BackButton />
        <div className="header-center">
          <h2>{local.DRAFT_HEADER}</h2>
        </div>
        <NavControls />
      </S.NavContainer>
    </div>
  )
}

export default InboxHeader
