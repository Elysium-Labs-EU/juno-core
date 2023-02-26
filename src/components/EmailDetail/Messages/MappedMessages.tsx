import { useCallback, useEffect, useMemo, useState } from 'react'

import * as global from 'constants/globalConstants'
import { openDraftEmail } from 'store/draftsSlice'
import { selectIsForwarding, selectIsReplying } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import type { IMappedMessages } from '../EmailDetailTypes'

const MappedMessages = ({
  indexMessageListener,
  setShouldRefreshDetail,
  threadDetail,
}: IMappedMessages) => {
  const [hideDraft, setHideDraft] = useState<number | null>(null)
  const dispatch = useAppDispatch()

  console.log('BOOM', threadDetail?.messages[0])

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

  return reversedMessagesOrder ? (
    <>
      {reversedMessagesOrder.map((message, index) => (
        <div key={message.id}>
          {message?.labelIds?.includes(global.DRAFT_LABEL) ? (
            <DraftMessage
              draftIndex={index}
              handleClickListener={handleClickDraft}
              hideDraft={hideDraft === index}
              message={message}
            />
          ) : (
            <ReadUnreadMessage
              handleClickListener={handleClickMessage}
              message={message}
              messageIndex={index}
              setShouldRefreshDetail={setShouldRefreshDetail}
              threadDetail={threadDetail}
            />
          )}
        </div>
      ))}
    </>
  ) : (
    <p>{global.NOTHING_TO_SEE}</p>
  )
}

export default MappedMessages
