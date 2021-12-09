import React from 'react'
import BackButton from '../BackButton'
import Navigation from '../MainHeader/Navigation/Navigation'
import '../MainHeader/Navigation/Navigation.scss'
import * as local from '../../constants/composeEmailConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const ComposeHeader = () => (
  <GS.OuterContainer>
    <S.Wrapper>
      <div className="header-center">
        <S.PageTitle>{local.COMPOSE}</S.PageTitle>
      </div>
      <S.BackButtonWithNavgationContainer>
        <BackButton />
        <Navigation />
      </S.BackButtonWithNavgationContainer>
    </S.Wrapper>
  </GS.OuterContainer>
)

export default ComposeHeader
