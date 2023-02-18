/* eslint-disable react/jsx-no-useless-fragment */
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import * as local from 'constants/emailDetailConstants'
import * as global from 'constants/globalConstants'
import { openDraftEmail } from 'store/draftsSlice'
import { selectIsForwarding, selectIsReplying } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'

import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import useMarkEmailAsRead from './Hooks/useMarkEmailAsRead'
import StyledCircularProgress from '../../Elements/CircularProgress/StyledCircularProgress'
import * as ES from '../EmailDetailStyles'

interface IMessagesOverview {
  isForwarding: boolean
  isLoading: boolean
  isReplying: boolean
  labelIds: string[]
  setShouldRefreshDetail: Dispatch<SetStateAction<boolean>>
  setUnsubscribeLink: Dispatch<SetStateAction<string | null>>
  threadDetail: IEmailListThreadItem | undefined | null
}

interface IMappedMessages
  extends Pick<IMessagesOverview, 'setShouldRefreshDetail' | 'threadDetail'> {
  indexMessageListener: (value: number) => void
  setUnsubscribeLink: Dispatch<SetStateAction<string | null>>
}

const MappedMessages = ({
  threadDetail,
  setUnsubscribeLink,
  indexMessageListener,
  setShouldRefreshDetail,
}: IMappedMessages) => {
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
    () => threadDetail?.messages.slice(0).reverse(),
    [threadDetail]
  )

  return threadDetail?.messages ? (
    <>
      {reversedMessagesOrder
        ? reversedMessagesOrder.map((message, index) => (
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
          ))
        : null}
    </>
  ) : (
    <p>{global.NOTHING_TO_SEE}</p>
  )
}

const MessagesOverview = ({
  threadDetail,
  isLoading,
  isReplying,
  isForwarding,
  labelIds,
  setShouldRefreshDetail,
  setUnsubscribeLink,
}: IMessagesOverview) => {
  const [localThreadDetail, setLocalThreadDetail] = useState<
    IEmailListThreadItem | null | undefined
  >(null)
  // const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
  //   undefined
  // )

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

  // // A callback function that will listen to the discard or cancel event on the composer
  // const messageOverviewListener = useCallback(
  //   (eventType: 'cancel' | 'discard') => {
  //     // TODO: Discard eventType is currently unused.
  //     if (eventType === 'cancel') {
  //       setSelectedIndex(undefined)
  //     }
  //   },
  //   [localThreadDetail]
  // )

  // /**
  //  * @function indexMessageListener
  //  * This function will listen to the selected draft messsage. This is used to get a body value when opening the composer.
  //  * @param value - number of the index of the selected Draft Message
  //  * @returns {void} - returns the found object or undefined if not found as a change on the state.
  //  */
  // const indexMessageListener = (value: number) => {
  //   setSelectedIndex(value)
  // }

  return (
    <ES.MessageFeedComposerContainer>
      <ES.EmailDetailContainer tabbedView={isReplying || isForwarding}>
        <ES.DetailBase>
          <ES.CardFullWidth>
            {localThreadDetail?.messages && !isLoading ? (
              <MappedMessages
                threadDetail={localThreadDetail}
                setUnsubscribeLink={setUnsubscribeLink}
                indexMessageListener={(value) => {
                  console.log(value)
                }}
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
      {/* {isReplying && localThreadDetail && localThreadDetail?.messages && (
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
      )} */}
    </ES.MessageFeedComposerContainer>
  )
}
export default MessagesOverview
