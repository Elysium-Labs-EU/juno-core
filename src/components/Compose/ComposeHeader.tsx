import React from 'react'
import BackButton from '../Elements/Buttons/BackButton'
import Navigation from '../MainHeader/Navigation/Navigation'
import '../MainHeader/Navigation/Navigation.scss'
import * as local from '../../constants/composeEmailConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const ComposeHeader = () => (
  <GS.OuterContainer>
    <S.Wrapper>
      <S.HeaderCenter>
        <S.PageTitle>{local.COMPOSE}</S.PageTitle>
      </S.HeaderCenter>
      <S.BackButtonWithNavgationContainer>
        <BackButton />
        <Navigation />
      </S.BackButtonWithNavgationContainer>
    </S.Wrapper>
  </GS.OuterContainer>
)

export default ComposeHeader
