import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import EmailDetailOptions from './EmailDetailOptions'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import ComposeEmail from '../../Compose/ComposeEmailContainer'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import * as draft from '../../../constants/draftConstants'
import * as ES from '../EmailDetailStyles'
import { IEmailListThreadItem, IEmailMessage } from '../../../Store/emailListTypes'
import { useAppDispatch } from '../../../Store/hooks'
import markEmailAsRead from '../../../utils/markEmailAsRead'
import findPayloadHeadersData from '../../../utils/findPayloadHeadersData'
import convertToContact from '../../../utils/convertToContact'


const fromEmail = (threadDetail: IEmailListThreadItem) => {
  const query = 'From'
  if (threadDetail) {
    const data: string = findPayloadHeadersData(query, threadDetail)
    return convertToContact(data)
  }
  return null
}

const bccEmail = (threadDetail: IEmailListThreadItem) => {
  const query = 'Bcc'
  if (threadDetail) {
    const data: string = findPayloadHeadersData(query, threadDetail)
    return convertToContact(data)
  }
  return null
}

const ccEmail = (threadDetail: IEmailListThreadItem) => {
  const query = 'Cc'
  if (threadDetail) {
    const data: string = findPayloadHeadersData(query, threadDetail)
    return convertToContact(data)
  }
  return null
}

const emailSubject = (threadDetail: IEmailListThreadItem) => {
  const query = 'Subject'
  if (threadDetail) {
    return findPayloadHeadersData(query, threadDetail)
  }
  return null
}

interface IDetailDisplaySelector {
  message: IEmailMessage
  threadDetail: IEmailListThreadItem
  isReplyingListener: Function
  index: number
}

const detailDisplaySelector = ({
  message,
  threadDetail,
  isReplyingListener,
  index
}: IDetailDisplaySelector) => {
  if (Object.prototype.hasOwnProperty.call(message, 'labelIds')) {
    if (message.labelIds.includes(draft.DRAFT_LABEL)) {
      return <DraftMessage message={message} />
    }
    if (!message.labelIds.includes(draft.DRAFT_LABEL)) {
      return <ReadUnreadMessage message={message} threadDetail={threadDetail} FROM={local.FROM} isReplyingListener={isReplyingListener} messageIndex={index} />
    }
    return null
  }
  return <ReadUnreadMessage message={message} threadDetail={threadDetail} FROM={local.FROM} isReplyingListener={isReplyingListener} messageIndex={index} />
}

interface IMessagesOverview {
  threadDetail: IEmailListThreadItem
  isLoading: boolean
  isReplying: boolean
  isReplyingListener: Function
  labelIds: string[]
}

const MessagesOverview = React.memo(
  ({
    threadDetail,
    isLoading,
    isReplying,
    isReplyingListener,
    labelIds,
  }: IMessagesOverview) => {
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
          if (threadDetail.messages.filter((message) => message.labelIds?.includes(global.UNREAD_LABEL) === true).length > 0) {
            const messageId = threadDetail.id
            markEmailAsRead({ messageId, dispatch, labelIds })
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
            <EmailDetailOptions threadDetail={threadDetail} isReplyingListener={isReplyingListener} />
          )}
        </ES.DetailRow>
        {isReplying && threadDetail && threadDetail.messages && (
          <ES.ComposeWrapper>
            <ComposeEmail
              isReplying={isReplying}
              isReplyingListener={isReplyingListener}
              to={fromEmail(threadDetail)}
              cc={ccEmail(threadDetail)}
              bcc={bccEmail(threadDetail)}
              subject={emailSubject(threadDetail)}
              threadId={threadDetail.id}
            />
          </ES.ComposeWrapper>
        )}
      </>
    )
  }
)
export default MessagesOverview
