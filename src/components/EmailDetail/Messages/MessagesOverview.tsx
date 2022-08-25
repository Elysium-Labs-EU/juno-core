import { useEffect, useMemo, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import EmailDetailOptions from './EmailDetailOptions'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import * as ES from '../EmailDetailStyles'
import {
  IEmailListThreadItem,
  IEmailMessage,
} from '../../../store/storeTypes/emailListTypes'
import { useAppDispatch } from '../../../store/hooks'
import markEmailAsRead from '../../../utils/markEmailAsRead'
import ReplyComposer from './InlineComposers/ReplyComposer'
import ForwardingComposer from './InlineComposers/ForwardingComposer'

interface IDetailDisplaySelector {
  message: IEmailMessage
  threadDetail: IEmailListThreadItem
  index: number
  setUnsubscribeLink: (value: string | null) => void
  setContentRendered: (value: boolean) => void
  indexMessageListener: (value: number) => void
}

const DetailDisplaySelector = ({
  message,
  threadDetail,
  index,
  setUnsubscribeLink,
  setContentRendered,
  indexMessageListener,
}: IDetailDisplaySelector) => {
  if (message.labelIds.includes(global.DRAFT_LABEL)) {
    return (
      <DraftMessage
        message={message}
        draftIndex={index}
        indexMessageListener={indexMessageListener}
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
  indexMessageListener,
}: {
  threadDetail: IEmailListThreadItem
  setUnsubscribeLink: (value: string | null) => void
  setContentRendered: (value: boolean) => void
  indexMessageListener: (value: number) => void
}) =>
  threadDetail.messages ? (
    <>
      {threadDetail.messages
        .slice(0)
        .reverse()
        .map((message, index) => (
          <div key={message.id}>
            <DetailDisplaySelector
              message={message}
              threadDetail={threadDetail}
              index={index}
              setUnsubscribeLink={setUnsubscribeLink}
              setContentRendered={setContentRendered}
              indexMessageListener={indexMessageListener}
            />
          </div>
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

const MessagesOverview = ({
  threadDetail,
  isLoading,
  isReplying,
  isForwarding,
  labelIds,
  setContentRendered,
}: IMessagesOverview) => {
  const dispatch = useAppDispatch()
  const [unsubscribeLink, setUnsubscribeLink] = useState<string | null>(null)
  // Create a local copy of threadDetail to manipulate. Is used by discarding and opening a threadDetail draft.
  const [localThreadDetail, setLocalThreadDetail] =
    useState<IEmailListThreadItem | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {
    let mounted = true
    if (mounted) {
      setLocalThreadDetail(threadDetail)
    }
    return () => {
      mounted = false
    }
  }, [threadDetail])

  const messageOverviewListener = (messageId: string) => {
    if (localThreadDetail && localThreadDetail.messages) {
      setLocalThreadDetail({
        ...localThreadDetail,
        messages: localThreadDetail.messages.filter(
          (message) => message.id !== messageId
        ),
      })
    }
  }

  useEffect(() => {
    if (localThreadDetail && Object.keys(localThreadDetail).length > 0) {
      if (localThreadDetail.messages && localThreadDetail.messages.length > 0) {
        if (
          localThreadDetail.messages.filter(
            (message) =>
              message.labelIds?.includes(global.UNREAD_LABEL) === true
          ).length > 0
        ) {
          markEmailAsRead({
            threadId: localThreadDetail.id,
            dispatch,
            labelIds,
          })
        }
      }
    }
  }, [localThreadDetail])

  /**
   * @function indexMessageListener
   * This function will listen to the selected draft messsage. This is used to get a body value when opening the composer.
   * @param value - number of the index of the selected Draft Message
   * @returns {void} - returns the found object or undefined if not found as a change on the state.
   */
  const indexMessageListener = (value: number) => {
    setSelectedIndex(value)
  }

  const memoizedMessagesOverview = useMemo(
    () => (
      <>
        <ES.DetailRow>
          <ES.EmailDetailContainer tabbedView={isReplying || isForwarding}>
            <ES.DetailBase>
              <ES.CardFullWidth>
                {localThreadDetail?.messages && !isLoading ? (
                  <MappedMessages
                    threadDetail={localThreadDetail}
                    setUnsubscribeLink={setUnsubscribeLink}
                    setContentRendered={setContentRendered}
                    indexMessageListener={indexMessageListener}
                  />
                ) : (
                  <ES.LoadingErrorWrapper>
                    <CircularProgress />
                  </ES.LoadingErrorWrapper>
                )}
                {!localThreadDetail && (
                  <ES.LoadingErrorWrapper>
                    {isLoading && <CircularProgress />}
                    {!isLoading && <p>{local.ERROR_EMAIL}</p>}
                  </ES.LoadingErrorWrapper>
                )}
              </ES.CardFullWidth>
            </ES.DetailBase>
          </ES.EmailDetailContainer>
          {localThreadDetail &&
            !isReplying &&
            !isForwarding &&
            localThreadDetail.messages && (
              <EmailDetailOptions
                threadDetail={localThreadDetail}
                unsubscribeLink={unsubscribeLink}
              />
            )}
        </ES.DetailRow>
        {isReplying && localThreadDetail && localThreadDetail.messages && (
          <ReplyComposer
            localThreadDetail={localThreadDetail}
            selectedIndex={selectedIndex}
            messageOverviewListener={messageOverviewListener}
          />
        )}
        {isForwarding && localThreadDetail && localThreadDetail.messages && (
          <ForwardingComposer
            localThreadDetail={localThreadDetail}
            selectedIndex={selectedIndex}
            messageOverviewListener={messageOverviewListener}
            isForwarding={isForwarding}
          />
        )}
      </>
    ),
    [localThreadDetail, unsubscribeLink, isReplying, isForwarding]
  )

  return memoizedMessagesOverview
}
export default MessagesOverview
