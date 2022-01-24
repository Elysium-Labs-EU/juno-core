import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectServiceUnavailable } from '../../Store/utilsSlice'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 2rem;
  padding-top: 0.5rem;
`

const LoadingState = () => {
  const setServiceUnavailable = useSelector(selectServiceUnavailable)
  return (
    <Wrapper>
      <CircularProgress />
      {setServiceUnavailable && <p>{setServiceUnavailable}</p>}
    </Wrapper>
  )
}

export default LoadingState
