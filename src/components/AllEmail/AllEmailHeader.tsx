import Navigation from '../MainHeader/Navigation/Navigation'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const ALL_EMAIL_HEADER = 'All Mail'

const AllEmailHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <S.HeaderCenter>
        <S.PageTitle>{ALL_EMAIL_HEADER}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
  </GS.OuterContainer>
)

export default AllEmailHeader
