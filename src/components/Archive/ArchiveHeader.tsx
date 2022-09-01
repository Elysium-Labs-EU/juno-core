import Navigation from '../MainHeader/Navigation/Navigation'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const ARCHIVE_HEADER = 'Archive'

const AllEmailHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <S.HeaderCenter>
        <S.PageTitle>{ARCHIVE_HEADER}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
  </GS.OuterContainer>
)

export default AllEmailHeader
