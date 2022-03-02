import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import * as S from './BaseLoaderStyles'
import { selectServiceUnavailable } from '../../Store/utilsSlice'
import Logo from '../../images/Juno_logo.png'
import LogoutOption from '../MainHeader/Navigation/More/Options/LogoutOption'

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
              <LinearProgress />
            </S.LoaderContainer>
          </>
        )}
        {serviceUnavailable && (
          <>
            <p>{serviceUnavailable}</p>
            <LogoutOption />
          </>
        )}
      </S.Inner>
    </S.Wrapper>
  )
}

export default Baseloader
