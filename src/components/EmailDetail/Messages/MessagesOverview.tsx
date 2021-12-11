import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import EmailDetailOptions from './EmailDetailOptions'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import ComposeEmail from '../../Compose/ComposeEmail'
import * as local from '../../../constants/emailDetailConstants'
import * as draft from '../../../constants/draftConstants'
import * as ES from '../EmailDetailStyles'
import { findPayloadHeadersData } from '../../../utils'
import { EmailListThreadItem, EmailMessage } from '../../../Store/emailListTypes'
import { useAppDispatch } from '../../../Store/hooks'
import MarkEmailAsRead from '../../../utils/markEmailAsRead'

const fromEmail = (threadDetail: EmailListThreadItem) => {
  const query = 'From'
  if (threadDetail) {
    return findPayloadHeadersData({ threadDetail, query })
  }
  return null
}

const emailSubject = (threadDetail: EmailListThreadItem) => {
  const query = 'Subject'
  if (threadDetail) {
    return findPayloadHeadersData({ threadDetail, query })
  }
  return null
}

const detailDisplaySelector = ({
  message,
  threadDetail,
  isReplyingListener,
  index
}: {
  message: EmailMessage
  threadDetail: EmailListThreadItem
  isReplyingListener: any
  index: number
}) => {
  if (Object.prototype.hasOwnProperty.call(message, 'labelIds')) {
    if (message.labelIds.includes(draft.LABEL)) {
      return <DraftMessage message={message} />
    }
    if (!message.labelIds.includes(draft.LABEL)) {
      return <ReadUnreadMessage message={message} threadDetail={threadDetail} FROM={local.FROM} isReplyingListener={isReplyingListener} messageIndex={index} />
    }
    return null
  }
  return <ReadUnreadMessage message={message} threadDetail={threadDetail} FROM={local.FROM} isReplyingListener={isReplyingListener} messageIndex={index} />
}

const MessagesOverview = React.memo(
  ({
    threadDetail,
    isLoading,
    isReplying,
    isReplyingListener,
    labelIds,
  }: {
    threadDetail: EmailListThreadItem
    isLoading: boolean
    isReplying: boolean
    isReplyingListener: any
    labelIds: string[]
  }) => {
    const dispatch = useAppDispatch()

    const MappedMessages = () =>
      threadDetail &&
      threadDetail.messages &&
      !isLoading &&
      threadDetail.messages
        .slice(0)
        .reverse()
        .map((message, index) => (
          <ES.EmailWrapper key={message.id} labelIds={message.labelIds}>
            {detailDisplaySelector({
              message,
              threadDetail,
              isReplyingListener,
              index
            })}
          </ES.EmailWrapper>
        ))

    useEffect(() => {
      if (threadDetail && Object.keys(threadDetail).length > 0) {
        if (threadDetail.messages && threadDetail.messages.length > 0) {
          if (threadDetail.messages.filter((message) => message.labelIds?.includes('UNREAD') === true).length > 0) {
            const messageId = threadDetail.id
            MarkEmailAsRead({ messageId, dispatch, labelIds })
          }
        }
      }
    }, [threadDetail])

    return (
      <>
        <ES.DetailRow>
          <ES.EmailDetailContainer isReplying={isReplying}>
            <ES.DetailBase>
              <ES.CardFullWidth>
                {threadDetail && threadDetail.messages && !isLoading ? (
                  MappedMessages()
                ) : (
                  <ES.LoadingErrorWrapper>
                    <CircularProgress />
                  </ES.LoadingErrorWrapper>
                )}
                {!threadDetail && (
                  <ES.LoadingErrorWrapper>
                    {isLoading && <CircularProgress />}
                    {!isLoading && <p>{local.ERROR_EMAIL}</p>}
                  </ES.LoadingErrorWrapper>
                )}
              </ES.CardFullWidth>
            </ES.DetailBase>
          </ES.EmailDetailContainer>
          {threadDetail && !isReplying && (
            threadDetail.messages &&
            <EmailDetailOptions messageId={threadDetail.id} isReplyingListener={isReplyingListener} threadId={threadDetail.messages[threadDetail.messages.length - 1].threadId} />
          )}
        </ES.DetailRow>
        {isReplying && threadDetail && threadDetail.messages && (
          <ComposeEmail
            isReplying={isReplying}
            isReplyingListener={isReplyingListener}
            to={fromEmail(threadDetail)}
            subject={emailSubject(threadDetail)}
            threadId={threadDetail.id}
          />
        )}
      </>
    )
  }
)
export default MessagesOverview
