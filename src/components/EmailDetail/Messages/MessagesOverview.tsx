import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import * as local from 'constants/emailDetailConstants'
import * as global from 'constants/globalConstants'
import { openDraftEmail } from 'store/draftsSlice'
import { selectIsForwarding, selectIsReplying } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'

import StyledCircularProgress from '../../Elements/StyledCircularProgress'
import * as ES from '../EmailDetailStyles'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import EmailDetailOptions from './EmailDetailOptions'
import useMarkEmailAsRead from './Hooks/useMarkEmailAsRead'
import ForwardingComposer from './InlineComposers/ForwardingComposer'
import ReplyComposer from './InlineComposers/ReplyComposer'

const MappedMessages = ({
  threadDetail,
  setUnsubscribeLink,
  indexMessageListener,
  setShouldRefreshDetail,
}: {
  threadDetail: IEmailListThreadItem
  setUnsubscribeLink: Dispatch<SetStateAction<string | null>>
  indexMessageListener: (value: number) => void
  setShouldRefreshDetail: Dispatch<SetStateAction<boolean>>
}) => {
  const [hideDraft, setHideDraft] = useState<number | null>(null)
  const dispatch = useAppDispatch()

  const handleClickDraft = useCallback(
    ({
      id,
      messageId,
      dIndex,
    }: {
      id: string
      messageId: string
      dIndex: number
    }) => {
      dispatch(openDraftEmail({ id, messageId }))
      setHideDraft(dIndex)
      indexMessageListener(dIndex)
    },
    []
  )

  const handleClickMessage = useCallback(({ mIndex }: { mIndex: number }) => {
    indexMessageListener(mIndex)
  }, [])

  /**
   * This function unhides the draft when neither forwarding or replying mode is active
   */
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  useEffect(() => {
    if (!isReplying && !isForwarding) {
      setHideDraft(null)
    }
  }, [isReplying, isForwarding])

  const reversedMessagesOrder = useMemo(
    () => threadDetail.messages.slice(0).reverse(),
    [threadDetail]
  )

  return threadDetail.messages ? (
    <>
      {reversedMessagesOrder.map((message, index) => (
        <div key={message.id}>
          {message?.labelIds?.includes(global.DRAFT_LABEL) ? (
            <DraftMessage
              message={message}
              draftIndex={index}
              handleClickListener={handleClickDraft}
              hideDraft={hideDraft === index}
            />
          ) : (
            <ReadUnreadMessage
              message={message}
              threadDetail={threadDetail}
              handleClickListener={handleClickMessage}
              messageIndex={index}
              setUnsubscribeLink={setUnsubscribeLink}
              setShouldRefreshDetail={setShouldRefreshDetail}
            />
          )}
        </div>
      ))}
    </>
  ) : (
    <p>{global.NOTHING_TO_SEE}</p>
  )
}

interface IMessagesOverview {
  threadDetail: IEmailListThreadItem
  isLoading: boolean
  isReplying: boolean
  isForwarding: boolean
  labelIds: string[]
  setShouldRefreshDetail: Dispatch<SetStateAction<boolean>>
}

const MessagesOverview = ({
  threadDetail,
  isLoading,
  isReplying,
  isForwarding,
  labelIds,
  setShouldRefreshDetail,
}: IMessagesOverview) => {
  const [unsubscribeLink, setUnsubscribeLink] = useState<string | null>(null)
  const [localThreadDetail, setLocalThreadDetail] =
    useState<IEmailListThreadItem | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {
    let mounted = true
    if (mounted) {
      // Create a local copy of threadDetail to manipulate. Is used by opening a threadDetail draft, and reversing the message order.
      setLocalThreadDetail(threadDetail)
    }
    return () => {
      mounted = false
    }
  }, [threadDetail])

  // On mount of the email detail - mark the email as read when it is unread.
  useMarkEmailAsRead({ localThreadDetail, labelIds })

  // A callback function that will listen to the discard or cancel event on the composer
  const messageOverviewListener = useCallback(
    (eventType: 'cancel' | 'discard') => {
      // TODO: Discard eventType is currently unused.
      if (eventType === 'cancel') {
        setSelectedIndex(undefined)
      }
    },
    [localThreadDetail]
  )

  /**
   * @function indexMessageListener
   * This function will listen to the selected draft messsage. This is used to get a body value when opening the composer.
   * @param value - number of the index of the selected Draft Message
   * @returns {void} - returns the found object or undefined if not found as a change on the state.
   */
  const indexMessageListener = (value: number) => {
    setSelectedIndex(value)
  }

  return (
    <>
      <ES.DetailRow>
        <ES.EmailDetailContainer tabbedView={isReplying || isForwarding}>
          <ES.DetailBase>
            <ES.CardFullWidth>
              {localThreadDetail?.messages && !isLoading ? (
                <MappedMessages
                  threadDetail={localThreadDetail}
                  setUnsubscribeLink={setUnsubscribeLink}
                  indexMessageListener={indexMessageListener}
                  setShouldRefreshDetail={setShouldRefreshDetail}
                />
              ) : (
                <ES.LoadingErrorWrapper>
                  <StyledCircularProgress />
                </ES.LoadingErrorWrapper>
              )}
              {!localThreadDetail && (
                <ES.LoadingErrorWrapper>
                  {isLoading && <StyledCircularProgress />}
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
      {isReplying && localThreadDetail && localThreadDetail?.messages && (
        <ReplyComposer
          localThreadDetail={localThreadDetail}
          selectedIndex={selectedIndex}
          messageOverviewListener={messageOverviewListener}
        />
      )}
      {isForwarding && localThreadDetail && localThreadDetail?.messages && (
        <ForwardingComposer
          localThreadDetail={localThreadDetail}
          selectedIndex={selectedIndex}
          messageOverviewListener={messageOverviewListener}
          isForwarding={isForwarding}
        />
      )}
    </>
  )
}
export default MessagesOverview
