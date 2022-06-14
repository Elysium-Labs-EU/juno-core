import { memo, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import EmailDetailOptions from './EmailDetailOptions'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import ComposeEmail from '../../Compose/ComposeEmail'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import * as ES from '../EmailDetailStyles'
import {
  IEmailListThreadItem,
  IEmailMessage,
} from '../../../Store/storeTypes/emailListTypes'
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
  index: number
  setUnsubscribeLink: Function
  setContentRendered: (value: boolean) => void
}

const DetailDisplaySelector = ({
  message,
  threadDetail,
  index,
  setUnsubscribeLink,
  setContentRendered,
}: IDetailDisplaySelector) => {
  if (Object.prototype.hasOwnProperty.call(message, 'labelIds')) {
    if (message.labelIds.includes(global.DRAFT_LABEL)) {
      return <DraftMessage message={message} />
    }
    return (
      <ReadUnreadMessage
        message={message}
        threadDetail={threadDetail}
        messageIndex={index}
        setUnsubscribeLink={setUnsubscribeLink}
        setContentRendered={setContentRendered}
      />
    )
  }
  return (
    <ReadUnreadMessage
      message={message}
      threadDetail={threadDetail}
      messageIndex={index}
      setUnsubscribeLink={setUnsubscribeLink}
      setContentRendered={setContentRendered}
    />
  )
}

const MappedMessages = ({
  threadDetail,
  setUnsubscribeLink,
  setContentRendered,
}: {
  threadDetail: IEmailListThreadItem
  setUnsubscribeLink: Function
  setContentRendered: (value: boolean) => void
}) =>
  threadDetail.messages ? (
    <>
      {threadDetail.messages
        .slice(0)
        .reverse()
        .map((message, index) => (
          <ES.EmailWrapper key={message.id} labelIds={message.labelIds}>
            <DetailDisplaySelector
              message={message}
              threadDetail={threadDetail}
              index={index}
              setUnsubscribeLink={setUnsubscribeLink}
              setContentRendered={setContentRendered}
            />
          </ES.EmailWrapper>
        ))}
    </>
  ) : (
    <p>{global.NOTHING_TO_SEE}</p>
  )

interface IMessagesOverview {
  threadDetail: IEmailListThreadItem
  isLoading: boolean
  isReplying: boolean
  isForwarding: boolean
  labelIds: string[]
  setContentRendered: (value: boolean) => void
}

const MessagesOverview = memo(
  ({
    threadDetail,
    isLoading,
    isReplying,
    isForwarding,
    labelIds,
    setContentRendered,
  }: IMessagesOverview) => {
    const dispatch = useAppDispatch()
    const [unsubscribeLink, setUnsubscribeLink] = useState<string | null>(null)

    useEffect(() => {
      if (threadDetail && Object.keys(threadDetail).length > 0) {
        if (threadDetail.messages && threadDetail.messages.length > 0) {
          if (
            threadDetail.messages.filter(
              (message) =>
                message.labelIds?.includes(global.UNREAD_LABEL) === true
            ).length > 0
          ) {
            markEmailAsRead({ messageId: threadDetail.id, dispatch, labelIds })
          }
        }
      }
    }, [threadDetail])

    return (
      <>
        <ES.DetailRow>
          <ES.EmailDetailContainer>
            <ES.DetailBase>
              <ES.CardFullWidth>
                {threadDetail && !isLoading ? (
                  <MappedMessages
                    threadDetail={threadDetail}
                    setUnsubscribeLink={setUnsubscribeLink}
                    setContentRendered={setContentRendered}
                  />
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
          {threadDetail &&
            !isReplying &&
            !isForwarding &&
            threadDetail.messages && (
              <EmailDetailOptions
                threadDetail={threadDetail}
                unsubscribeLink={unsubscribeLink}
              />
            )}
        </ES.DetailRow>
        {isReplying && threadDetail && threadDetail.messages && (
          <ES.ComposeWrapper>
            <ComposeEmail
              to={fromEmail(threadDetail)}
              cc={ccEmail(threadDetail)}
              bcc={bccEmail(threadDetail)}
              subject={emailSubject(threadDetail)}
              threadId={threadDetail.id}
            />
          </ES.ComposeWrapper>
        )}
        {isForwarding && threadDetail && threadDetail.messages && (
          <ES.ComposeWrapper>
            <ComposeEmail
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
