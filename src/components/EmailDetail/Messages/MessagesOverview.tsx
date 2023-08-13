import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
// import { ERROR_EMAIL } from 'constants/emailDetailConstants'
import Stack from 'components/Elements/Stack/Stack'

import useMarkEmailAsRead from './Hooks/useMarkEmailAsRead'
import * as S from '../EmailDetailStyles'
import type { IMessagesOverview } from '../EmailDetailTypes'

const MessagesOverview = ({
  children,
  threadDetail,
  labelIds,
}: IMessagesOverview) => {
  // On mount of the email detail - mark the email as read when it is unread.
  useMarkEmailAsRead({ labelIds, threadDetail })

  // TODO: Create an error state for this. Potentially by using RTK Query

  return (
    <S.MessageFeedContainer>
      <S.EmailDetailContainer>
        <Stack direction="vertical" style={{ width: '100%' }}>
          {threadDetail?.messages ? (
            children
          ) : (
            <S.LoadingErrorWrapper>
              <StyledCircularProgress />
            </S.LoadingErrorWrapper>
          )}
        </Stack>
      </S.EmailDetailContainer>
    </S.MessageFeedContainer>
  )
}
export default MessagesOverview
