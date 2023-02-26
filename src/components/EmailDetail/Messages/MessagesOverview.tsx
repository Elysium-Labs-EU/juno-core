import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import { ERROR_EMAIL } from 'constants/emailDetailConstants'

import useMarkEmailAsRead from './Hooks/useMarkEmailAsRead'
import * as ES from '../EmailDetailStyles'
import type { IMessagesOverview } from '../EmailDetailTypes'

const MessagesOverview = ({
  children,
  threadDetail,
  isLoading,
  isReplying,
  isForwarding,
  labelIds,
}: IMessagesOverview) => {
  // On mount of the email detail - mark the email as read when it is unread.
  useMarkEmailAsRead({ threadDetail, labelIds })

  return (
    <ES.MessageFeedComposerContainer>
      <ES.EmailDetailContainer tabbedView={isReplying || isForwarding}>
        <ES.DetailBase>
          <ES.CardFullWidth>
            {/* TODO: Introduce match pattern */}
            {threadDetail?.messages && !isLoading ? (
              children
            ) : (
              <ES.LoadingErrorWrapper>
                <StyledCircularProgress />
              </ES.LoadingErrorWrapper>
            )}
            {!threadDetail && (
              <ES.LoadingErrorWrapper>
                {isLoading && <StyledCircularProgress />}
                {!isLoading && <p>{ERROR_EMAIL}</p>}
              </ES.LoadingErrorWrapper>
            )}
          </ES.CardFullWidth>
        </ES.DetailBase>
      </ES.EmailDetailContainer>
    </ES.MessageFeedComposerContainer>
  )
}
export default MessagesOverview
