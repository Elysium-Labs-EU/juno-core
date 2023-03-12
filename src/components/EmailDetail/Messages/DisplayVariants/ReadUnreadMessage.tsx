import { useEffect, useMemo, useState } from 'react'

import EmailSnippet from 'components/Elements/EmailSnippet'
import EmailSubject from 'components/Elements/EmailSubject'
import getSenderNameFull from 'components/Elements/SenderName/getSenderNameFull'
import getSenderNamePartial from 'components/Elements/SenderName/getSenderNamePartial'
import type { IReadMessage } from 'components/EmailDetail/EmailDetailTypes'
import * as global from 'constants/globalConstants'
import { selectProfile } from 'store/baseSlice'
import { selectIsReplying } from 'store/emailDetailSlice'
import { useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'

import ClosedMessageLayout from './Layouts/ClosedMessageLayout'
import OpenMessageLayout from './Layouts/OpenMessageLayout'
import SpecificEmailOptions from '../SpecificEmailOptions'

export const getRemovedTrackers = ({
  message,
}: Pick<IReadMessage, 'message'>) => {
  if (
    'body' in message.payload &&
    message.payload?.body?.removedTrackers &&
    message.payload.body.removedTrackers.length > 0
  ) {
    return message.payload.body.removedTrackers
  }
  return null
}

const ReadUnreadMessage = ({
  handleClickListener,
  message,
  messageIndex,
  setShouldRefreshDetail,
  threadDetail,
}: IReadMessage) => {
  const [open, setOpen] = useState<boolean>(message && messageIndex === 0)
  const labelIds = useAppSelector(selectLabelIds)
  const isReplying = useAppSelector(selectIsReplying)
  const { emailAddress } = useAppSelector(selectProfile)

  useEffect(() => {
    let mounted = true
    if (threadDetail && threadDetail?.messages) {
      if (threadDetail.messages.length > 1 && mounted) {
        if (message && message?.labelIds?.includes(global.UNREAD_LABEL)) {
          setOpen(true)
        }
        if (
          message &&
          !Object.prototype.hasOwnProperty.call(message, 'labelIds') &&
          messageIndex === 0
        ) {
          setOpen(true)
        }
      }
      if (threadDetail.messages.length === 1) {
        setOpen(true)
      }
      if (
        threadDetail.messages.length > 1 &&
        threadDetail.messages.some((item) =>
          item?.labelIds?.includes(global.DRAFT_LABEL)
        )
      ) {
        setOpen(true)
      }
    }
    return () => {
      mounted = false
    }
  }, [])

  /**
   * In case the only other email in this thread isn't visible during opening a Draft in tab view, open it.
   */
  useEffect(() => {
    let mounted = true
    if (threadDetail && threadDetail.messages && !open) {
      if (
        isReplying &&
        threadDetail.messages.length === 2 &&
        threadDetail.messages.some((item) =>
          item.labelIds.includes(global.DRAFT_LABEL)
        ) &&
        mounted
      ) {
        setOpen(true)
      }
    }
    return () => {
      mounted = false
    }
  }, [isReplying, open])

  const handleClick = () => {
    setOpen((currState) => !currState)
  }

  const staticSenderNameFull = useMemo(
    () => getSenderNameFull(message.payload.headers?.from, emailAddress),
    []
  )
  const staticSenderNamePartial = useMemo(
    () => getSenderNamePartial(message.payload.headers?.from, emailAddress),
    []
  )
  const staticEmailSubject = useMemo(
    () => EmailSubject(message.payload.headers?.subject),
    []
  )
  const staticSnippet = useMemo(() => EmailSnippet(message), [])

  // TODO: Check this
  // <Seo title={staticEmailSubject} />

  const memoizedClosedEmail = useMemo(
    () => (
      <ClosedMessageLayout
        handleClick={handleClick}
        message={message}
        emailSnippet={staticSnippet}
        senderNameFull={staticSenderNameFull}
        senderNamePartial={staticSenderNamePartial}
      />
    ),
    [message, staticSenderNamePartial, staticSenderNameFull]
  )

  const staticRemovedTrackers = getRemovedTrackers({ message })

  return open ? (
    <OpenMessageLayout
      emailSubject={staticEmailSubject}
      handleClick={handleClick}
      labelIds={labelIds}
      message={message}
      removedTrackers={staticRemovedTrackers}
      senderNameFull={staticSenderNameFull}
      senderNamePartial={staticSenderNamePartial}
      specificEmailOptions={
        <SpecificEmailOptions
          handleClickListener={handleClickListener}
          messageIndex={messageIndex}
          setShouldRefreshDetail={setShouldRefreshDetail}
          threadDetail={threadDetail}
        />
      }
    />
  ) : (
    memoizedClosedEmail
  )
}

export default ReadUnreadMessage
