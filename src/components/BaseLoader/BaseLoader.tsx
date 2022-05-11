import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import * as S from './BaseLoaderStyles'
import * as HS from '../MainHeader/HeaderStyles'
import { selectServiceUnavailable } from '../../Store/utilsSlice'
import Logo from '../../images/Juno_logo.png'
import LogoutOption from '../MainHeader/Navigation/More/Options/LogoutOption'

const ERROR_CODE_UNAUTHORIZED = 'Invalid'
const LOG_OUT_IN = 'Log out, log back in'
const LOGO_ALT = "Juno's Logo"

const AnimatedMountUnmount = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | any
}) => (
  <motion.div
    exit={{ opacity: 0.7, scale: 0.9 }}
    initial={{ opacity: 0.7, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    {children}
  </motion.div>
)

const Baseloader = () => {
  const serviceUnavailable = useSelector(selectServiceUnavailable)
  return (
    <S.Wrapper>
      <S.Inner>
        {!serviceUnavailable && (
          <>
            <AnimatedMountUnmount>
              <S.Container>
                <img
                  style={{ marginBottom: '1rem' }}
                  src={Logo}
                  alt={LOGO_ALT}
                />
              </S.Container>
            </AnimatedMountUnmount>
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
