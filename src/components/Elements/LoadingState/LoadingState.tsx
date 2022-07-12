import { useSelector } from 'react-redux'
import { selectServiceUnavailable } from '../../../store/utilsSlice'
import StyledCircularProgress from '../StyledCircularProgress'
import * as S from './LoadingStateStyles'

const LoadingState = () => {
  const setServiceUnavailable = useSelector(selectServiceUnavailable)
  return (
    <S.Wrapper>
      <StyledCircularProgress />
      {setServiceUnavailable && <p>{setServiceUnavailable}</p>}
    </S.Wrapper>
  )
}

export default LoadingState
