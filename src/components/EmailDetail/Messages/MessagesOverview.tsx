import React from 'react'
import isEmpty from 'lodash/isEmpty'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmailDetOptions from './EmailDetOptions'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import ComposeEmail from '../../Compose/ComposeEmail'
import * as local from '../../../constants/emailDetailConstants'
import * as draft from '../../../constants/draftConstants'
import * as ES from '../EmailDetailStyles'
import { findPayloadHeadersData } from '../../../utils'
import { EmailListThreadItem, EmailMessage } from '../../../Store/emailListTypes'

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

const detailDisplaySelector = ({ message, threadDetail }: { message: EmailMessage, threadDetail: EmailListThreadItem }) => {
  if (message.labelIds.includes(draft.LABEL)) {
    return (
      <DraftMessage
        message={message}
      />
    )
  }
  if (!message.labelIds.includes(draft.LABEL)) {
    return (
      <ReadUnreadMessage
        message={message}
        threadDetail={threadDetail}
        FROM={local.FROM}
      />
    )
  }
  return null
}

const MessagesOverview = ({ threadDetail, isLoading, isReplying, isReplyingListener }: { threadDetail: EmailListThreadItem, isLoading: boolean, isReplying: boolean, isReplyingListener: any }) =>
  <>
    <ES.DetailRow>
      <ES.EmailDetailContainer isReplying={isReplying}>
        <ES.DetailBase>
          <ES.CardFullWidth>
            {threadDetail && !isEmpty(threadDetail) && !isLoading ? (
              threadDetail.messages
                .slice(0)
                .reverse()
                .map((message) => (
                  <ES.EmailWrapper
                    key={message.id}
                    labelIds={message.labelIds}
                  >
                    {detailDisplaySelector({
                      message,
                      threadDetail,
                    })}
                  </ES.EmailWrapper>
                ))
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
        <EmailDetOptions
          messageId={threadDetail.id}
          setReply={isReplyingListener}
        />
      )}
    </ES.DetailRow>
    {isReplying && !isEmpty(threadDetail) && (
      <>
        <ComposeEmail
          isReplying={isReplying}
          isReplyingListener={isReplyingListener}
          to={fromEmail(threadDetail)}
          subject={emailSubject(threadDetail)}
          id={threadDetail.id}
          threadId={
            threadDetail.messages[threadDetail.messages.length - 1].threadId
          }
        />
      </>
    )}
  </>

export default MessagesOverview
