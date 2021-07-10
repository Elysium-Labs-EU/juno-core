import React from 'react'
import isEmpty from 'lodash/isEmpty'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmailDetOptions from './EmailDetOptions'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import ComposeEmail from '../../Compose/ComposeEmail'
import * as local from '../../../constants/emailDetailConstants'
import * as draft from '../../../constants/draftConstants'
import * as S from './EmailDetailStyles'
import { findPayloadHeadersData } from '../../../utils'

const fromEmail = (threadDetail) => {
  const query = 'From'
  if (threadDetail) {
    return findPayloadHeadersData({ threadDetail, query })
  }
  return null
}

const emailSubject = (threadDetail) => {
  const query = 'Subject'
  if (threadDetail) {
    return findPayloadHeadersData({ threadDetail, query })
  }
  return null
}

const detailDisplaySelector = ({ message, threadDetail }) => {
  if (message.labelIds.includes(draft.LABEL)) {
    return (
      <DraftMessage
        message={message}
        MESSAGE_ID_LABEL={local.MESSAGE_ID_LABEL}
        threadDetail={threadDetail}
      />
    )
  }
  if (!message.labelIds.includes(draft.LABEL)) {
    return (
      <ReadUnreadMessage
        message={message}
        FROM={local.FROM}
        MESSAGE_ID_LABEL={local.MESSAGE_ID_LABEL}
      />
    )
  }
  return null
}

const MessagesOverview = (props) => {
  const { threadDetail, isLoading, isReplying, isReplyingListener } = props

  return (
    <>
      <S.DetailRow>
        <S.EmailDetailContainer isReplying={isReplying}>
          <S.DetailBase>
            <S.CardFullWidth>
              {threadDetail &&
                !isEmpty(threadDetail) &&
                !isLoading &&
                threadDetail.messages
                  .slice(0)
                  .reverse()
                  .map((message) => (
                    <S.EmailWrapper
                      key={message.id}
                      labelIds={message.labelIds}
                    >
                      {detailDisplaySelector({
                        message,
                        threadDetail,
                      })}
                    </S.EmailWrapper>
                  ))}
              {!threadDetail && (
                <S.LoadingErrorWrapper>
                  {isLoading && <CircularProgress />}
                  {!isLoading && <p>{local.ERROR_EMAIL}</p>}
                </S.LoadingErrorWrapper>
              )}
            </S.CardFullWidth>
          </S.DetailBase>
        </S.EmailDetailContainer>
        {threadDetail && !isReplying && (
          <EmailDetOptions
            messageId={threadDetail.id}
            setReply={isReplyingListener}
          />
        )}
      </S.DetailRow>
      {isReplying && !isEmpty(threadDetail) && (
        <>
          <ComposeEmail
            isReplying={isReplying}
            isReplyingListener={isReplyingListener}
            to={fromEmail()}
            subject={emailSubject()}
            id={threadDetail.id}
            threadId={
              threadDetail.messages[threadDetail.messages.length - 1].threadId
            }
          />
        </>
      )}
    </>
  )
}

export default MessagesOverview
