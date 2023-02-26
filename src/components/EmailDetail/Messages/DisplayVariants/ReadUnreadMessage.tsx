import { useEffect, useMemo, useState } from 'react'

import EmailAvatar from 'components/Elements/Avatar/EmailAvatar'
import ContactCard from 'components/Elements/ContactCard/ContactCard'
import EmailHasAttachmentSimple from 'components/Elements/EmailHasAttachmentSimple'
import EmailLabel from 'components/Elements/EmailLabel'
import EmailSnippet from 'components/Elements/EmailSnippet'
import EmailSubject from 'components/Elements/EmailSubject'
import SenderNameFull from 'components/Elements/SenderName/senderNameFull'
import SenderNamePartial from 'components/Elements/SenderName/senderNamePartial'
import Seo from 'components/Elements/Seo'
import TimeStamp from 'components/Elements/TimeStamp/TimeStampDisplay'
import type { IReadMessage } from 'components/EmailDetail/EmailDetailTypes'
import * as global from 'constants/globalConstants'
import { selectProfile } from 'store/baseSlice'
import { selectIsReplying } from 'store/emailDetailSlice'
import { useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import { Span } from 'styles/globalStyles'

import LinkedContacts from './Recipients/LinkedContacts'
import EmailAttachment from '../../Attachment/EmailAttachment'
import * as S from '../../EmailDetailStyles'
import EmailDetailBody from '../EmailDetailBody/EmailDetailBody'
import RemovedTrackers from '../RemovedTrackers/RemovedTrackers'
import SpecificEmailOptions from '../SpecificEmailOptions'

const getRemovedTrackers = ({ message }: Pick<IReadMessage, 'message'>) => {
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

  console.log('rerender readUnreadMessage')

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
    () => SenderNameFull(message.payload.headers?.from, emailAddress),
    []
  )
  const staticSenderNamePartial = useMemo(
    () => SenderNamePartial(message.payload.headers?.from, emailAddress),
    []
  )
  const staticEmailSubject = useMemo(
    () => EmailSubject(message.payload.headers?.subject),
    []
  )
  const staticSnippet = useMemo(() => EmailSnippet(message), [])

  const memoizedClosedEmail = useMemo(
    () => (
      <S.EmailClosedWrapper onClick={handleClick} aria-hidden="true">
        <S.ClosedMessageWrapper>
          <S.ClosedAvatarSender>
            <ContactCard
              offset={[30, 10]}
              userEmail={staticSenderNameFull}
              contact={staticSenderNamePartial}
            >
              <EmailAvatar userEmail={staticSenderNameFull} />
            </ContactCard>
            <S.ClosedSender>
              <Span
                style={{ fontWeight: 'bold' }}
                title={staticSenderNamePartial?.emailAddress ?? ''}
              >
                {staticSenderNamePartial?.name}
              </Span>
            </S.ClosedSender>
          </S.ClosedAvatarSender>
          <S.ClosedSnippet>{staticSnippet}</S.ClosedSnippet>
          <S.TimeAttachmentContainer>
            <S.ChildDiv>
              <EmailHasAttachmentSimple files={message?.payload?.files} />
            </S.ChildDiv>

            <S.ChildDiv>
              <TimeStamp threadTimeStamp={message.internalDate} />
            </S.ChildDiv>
          </S.TimeAttachmentContainer>
        </S.ClosedMessageWrapper>
      </S.EmailClosedWrapper>
    ),
    [message, staticSenderNamePartial, staticSenderNameFull]
  )

  console.log({ threadDetail })

  const staticRemovedTrackers = getRemovedTrackers({ message })

  // TODO: Verify the need for an SEO component here
  return (
    <>
      <Seo title={staticEmailSubject} />
      {open ? (
        <S.EmailOpenWrapper>
          <S.TopContainer>
            <S.HeaderFullWidth>
              <S.ClickHeader onClick={handleClick} aria-hidden="true">
                <ContactCard
                  offset={[30, 10]}
                  userEmail={staticSenderNameFull}
                  contact={staticSenderNamePartial}
                >
                  <EmailAvatar userEmail={staticSenderNameFull} />
                </ContactCard>
                <S.EmailDetailTitle title={staticEmailSubject}>
                  {staticEmailSubject}
                </S.EmailDetailTitle>
              </S.ClickHeader>
              <S.TimeAttachmentContainer>
                <S.ChildDiv>
                  <EmailHasAttachmentSimple files={message?.payload?.files} />
                </S.ChildDiv>
                {labelIds.includes(global.SEARCH_LABEL) && (
                  <EmailLabel labelNames={message.labelIds} />
                )}
                <S.ChildDiv>
                  <TimeStamp threadTimeStamp={message.internalDate} />
                </S.ChildDiv>
                <S.ChildDiv>
                  <SpecificEmailOptions
                    handleClickListener={handleClickListener}
                    messageIndex={messageIndex}
                    setShouldRefreshDetail={setShouldRefreshDetail}
                    threadDetail={threadDetail}
                  />
                </S.ChildDiv>
              </S.TimeAttachmentContainer>
            </S.HeaderFullWidth>
          </S.TopContainer>
          <LinkedContacts message={message} />
          {staticRemovedTrackers && (
            <RemovedTrackers blockedTrackers={staticRemovedTrackers} />
          )}
          <S.GreyDivider />
          <S.EmailBody>
            {message && message?.payload ? (
              <EmailDetailBody
                detailBodyCSS={global.EMAIL_BODY_VISIBLE}
                threadDetailBody={message.payload}
              />
            ) : null}
          </S.EmailBody>
          <EmailAttachment message={message} />
        </S.EmailOpenWrapper>
      ) : (
        memoizedClosedEmail
      )}
    </>
  )
}

export default ReadUnreadMessage
