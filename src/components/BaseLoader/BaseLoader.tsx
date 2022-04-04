import { useSelector } from 'react-redux'
import * as S from './BaseLoaderStyles'
import * as HS from '../MainHeader/HeaderStyles'
import { selectServiceUnavailable } from '../../Store/utilsSlice'
import Logo from '../../images/Juno_logo.png'
import LogoutOption from '../MainHeader/Navigation/More/Options/LogoutOption'

const ERROR_CODE_UNAUTHORIZED = '401'
const LOG_OUT_IN = 'Log out, log back in'

const Baseloader = () => {
  const serviceUnavailable = useSelector(selectServiceUnavailable)
  return (
    <S.Wrapper>
      <S.Inner>
        {!serviceUnavailable && (
          <>
            <S.Container>
              <img
                style={{ marginBottom: '1rem' }}
                src={Logo}
                alt="Juno's Logo"
              />
            </S.Container>
            <S.LoaderContainer>
              <S.StyledLinearProgress />
            </S.LoaderContainer>
          </>
        )}
        {serviceUnavailable && (
          <>
            {serviceUnavailable.includes(ERROR_CODE_UNAUTHORIZED) && (
              <HS.PageTitle>{LOG_OUT_IN}</HS.PageTitle>
            )}
            <S.ServiceUnavailableParagraph>
              {serviceUnavailable}
            </S.ServiceUnavailableParagraph>
            <LogoutOption />
          </>
        )}
      </S.Inner>
    </S.Wrapper>
  )
}

export default Baseloader
