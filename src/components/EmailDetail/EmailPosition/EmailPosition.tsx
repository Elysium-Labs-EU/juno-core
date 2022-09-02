import { FiAlertCircle } from 'react-icons/fi'
import { selectSessionViewIndex } from '../../../store/emailDetailSlice'
import { useAppSelector } from '../../../store/hooks'
import * as S from './EmailPositionStyles'
import * as GS from '../../../styles/globalStyles'
import * as global from '../../../constants/globalConstants'
import { selectLabelIds } from '../../../store/labelsSlice'
import StyledCircularProgress from '../../Elements/StyledCircularProgress'
import StyledTooltip from '../../Elements/StyledTooltip'
import useFetchThreadsTotalNumber from '../../../hooks/useFetchThreadsTotalNumber'

const EXPLANATION =
  'This shows on what email you are of all the emails in this Gmail box.'

const EmailPosition = () => {
  const sessionViewIndex = useAppSelector(selectSessionViewIndex)
  const labelIds = useAppSelector(selectLabelIds)
  const { totalThreads, loadingState } = useFetchThreadsTotalNumber(labelIds)

  return (
    <S.Wrapper>
      {loadingState === global.LOAD_STATE_MAP.loaded && (
        <StyledTooltip title={EXPLANATION}>
          <GS.TextMutedParagraph style={{ fontSize: 13 }}>
            {sessionViewIndex + 1} / {totalThreads}
          </GS.TextMutedParagraph>
        </StyledTooltip>
      )}
      {loadingState === global.LOAD_STATE_MAP.loading && (
        <StyledCircularProgress size={10} />
      )}
      {loadingState === global.LOAD_STATE_MAP.error && (
        <FiAlertCircle title={global.SOMETHING_WRONG} />
      )}
    </S.Wrapper>
  )
}

export default EmailPosition
