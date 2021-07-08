import React from 'react'
import BackButton from '../BackButton'
import NavControls from '../MainHeader/Navigation/NavControls'
import '../MainHeader/Navigation/NavControls.scss'
import * as local from '../../constants/composeEmailConstants'
import * as S from './ComposeStyles'
import * as GS from '../../styles/globalStyles'

const ComposeHeader = () => {
  return (
    <GS.OuterContainer>
      <div className="nav-container">
        <S.HeaderButton>
          <BackButton />
        </S.HeaderButton>
        <div className="header-center">
          <h2>{local.COMPOSE}</h2>
        </div>
        <NavControls />
      </div>
    </GS.OuterContainer>
  )
}

export default ComposeHeader
