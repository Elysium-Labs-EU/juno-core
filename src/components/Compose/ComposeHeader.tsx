import BackButton from 'components/Elements/Buttons/BackButton'
import * as S from 'components/MainHeader/HeaderStyles'
import Navigation from 'components/MainHeader/Navigation/Navigation'
import * as local from 'constants/composeEmailConstants'
import * as GS from 'styles/globalStyles'

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
