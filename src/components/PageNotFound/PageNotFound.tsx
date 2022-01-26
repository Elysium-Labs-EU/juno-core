import { Link } from 'react-router-dom'
import RouteConstants from '../../constants/routes.json'
import Logo from '../../images/Juno_logo.png'
import * as S from './PageNotFoundStyles'
import * as GS from '../../styles/globalStyles'

const PAGE_NOT_FOUND = 'This page cannot be found'
const SUB_TEXT = 'You may want to start over'
const LINK_TEXT = 'Take me there'

const PageNotFound = () => (
    <GS.OuterContainer>
        <S.Wrapper>
            <S.Inner>
                <img
                    style={{ marginBottom: '1rem' }}
                    src={Logo}
                    alt="Juno's Logo"
                />
                <S.PageHeaderText>{PAGE_NOT_FOUND}</S.PageHeaderText>
                <p>{SUB_TEXT}</p>
                <Link to={RouteConstants.HOME}>{LINK_TEXT}</Link>
            </S.Inner>
        </S.Wrapper>
    </GS.OuterContainer>
)

export default PageNotFound
