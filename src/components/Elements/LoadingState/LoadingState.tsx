import { useAppSelector } from 'store/hooks'
import { selectSystemStatusUpdate } from 'store/utilsSlice'

import StyledCircularProgress from '../StyledCircularProgress'
import * as S from './LoadingStateStyles'

const LoadingState = () => {
  const systemStatusUpdate = useAppSelector(selectSystemStatusUpdate)
  return (
    <S.Wrapper>
      <StyledCircularProgress />
      {systemStatusUpdate && systemStatusUpdate.type === 'error' && (
        <p>{systemStatusUpdate.message}</p>
      )}
    </S.Wrapper>
  )
}

export default LoadingState
