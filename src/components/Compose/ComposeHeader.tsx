import React from 'react'
import BackButton from '../BackButton'
import Navigation from '../MainHeader/Navigation/Navigation'
import '../MainHeader/Navigation/Navigation.scss'
import * as local from '../../constants/composeEmailConstants'
import * as S from './ComposeStyles'
import * as GS from '../../styles/globalStyles'

const ComposeHeader = () => (
  <GS.OuterContainer>
    <div className="nav-container">
      <S.HeaderButton>
        <BackButton />
      </S.HeaderButton>
      <div className="header-center">
        <h2 className="page_title">{local.COMPOSE}</h2>
      </div>
      <Navigation />
    </div>
  </GS.OuterContainer>
)

export default ComposeHeader
