import CircularProgress from '@mui/material/CircularProgress'
import { useSelector } from 'react-redux'
import { Inner, Wrapper } from './BaseLoaderStyles'
import { selectServiceUnavailable } from '../../Store/utilsSlice'
import Logo from '../../images/Juno_logo.png'

const Baseloader = () => {
  const serviceUnavailable = useSelector(selectServiceUnavailable)
  return (
    <Wrapper>
      <Inner>
        {!serviceUnavailable && (
          <>
            <img
              style={{ marginBottom: '1rem' }}
              src={Logo}
              alt="Juno's Logo"
            />
            <CircularProgress />
          </>
        )}
        {serviceUnavailable && <p>{serviceUnavailable}</p>}
      </Inner>
    </Wrapper>
  )
}

export default Baseloader
