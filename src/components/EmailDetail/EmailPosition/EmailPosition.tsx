import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import StyledTooltip from 'components/Elements/StyledTooltip'
import * as global from 'constants/globalConstants'
import useFetchThreadsTotalNumber from 'hooks/useFetchThreadsTotalNumber'
import { QiWarningAlt } from 'images/svgIcons/quillIcons'
import {
  selectCoreStatus,
  selectSessionViewIndex,
} from 'store/emailDetailSlice'
import { selectSelectedEmails } from 'store/emailListSlice'
import { useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import { selectIsFlexibleFlowActive } from 'store/utilsSlice'
import { Paragraph } from 'styles/globalStyles'

import * as S from './EmailPositionStyles'

const EXPLANATION =
  'This shows on what email you are of all the emails in this Gmail box.'

const EmailPosition = () => {
  const coreStatus = useAppSelector(selectCoreStatus)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const sessionViewIndex = useAppSelector(selectSessionViewIndex)
  const { totalThreads, loadingState } = useFetchThreadsTotalNumber(labelIds)

  return (
    <S.Wrapper>
      {loadingState === global.LOAD_STATE_MAP.loaded && (
        <StyledTooltip title={EXPLANATION}>
          <Paragraph muted="true" style={{ fontSize: 13 }}>
            {sessionViewIndex + 1} /{' '}
            {(coreStatus === global.CORE_STATUS_MAP.focused ||
              (isFlexibleFlowActive &&
                coreStatus === global.CORE_STATUS_MAP.sorting)) &&
              selectedEmails &&
              selectedEmails.selectedIds.length > 0
              ? selectedEmails.selectedIds.length
              : totalThreads}
          </Paragraph>
        </StyledTooltip>
      )
      }
      {
        loadingState === global.LOAD_STATE_MAP.loading && (
          <StyledCircularProgress size={10} />
        )
      }
      {
        loadingState === global.LOAD_STATE_MAP.error && (
          <QiWarningAlt />
          // TODO: Add explanation here (Something went wrong)
        )
      }
    </S.Wrapper >
  )
}

export default EmailPosition
