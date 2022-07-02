import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import * as S from './BaseLoaderStyles'
import { selectServiceUnavailable } from '../../Store/utilsSlice'
import Logo from '../../images/Juno_logo.png'
import LogoutOption, {
  handleLogout,
} from '../MainHeader/Navigation/More/Options/LogoutOption'
import { useAppSelector } from '../../Store/hooks'

const LOGO_ALT = "Juno's Logo"
const REDIRECTED = 'You will be redirected to the login page in '
const SECONDS = ' seconds.'

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
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const [countDown, setCountDown] = useState(3)

  useEffect(() => {
    let mounted = true
    if (mounted && countDown === 0) {
      handleLogout()
    }
    return () => {
      mounted = false
    }
  }, [countDown])

  useEffect(() => {
    let mounted = true
    const timer = setTimeout(() => {
      mounted && setCountDown((currState) => currState - 1)
    }, 1000)
    return () => {
      mounted = false
      clearTimeout(timer)
    }
  })

  return (
    <S.Wrapper>
      <S.Inner>
        {!serviceUnavailable && (
          <>
            <AnimatedMountUnmount>
              <S.Container>
                <img
                  style={{ marginBottom: '16px' }}
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
            <S.ServiceUnavailableParagraph>
              {serviceUnavailable}
            </S.ServiceUnavailableParagraph>
            <S.ServiceUnavailableParagraph>
              {REDIRECTED}
              {countDown}
              {SECONDS}
            </S.ServiceUnavailableParagraph>
            <LogoutOption />
          </>
        )}
      </S.Inner>
    </S.Wrapper>
  )
}

export default Baseloader
