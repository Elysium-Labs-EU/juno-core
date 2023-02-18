import { useEffect, useMemo, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

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
import * as global from 'constants/globalConstants'
import { selectProfile } from 'store/baseSlice'
import { selectIsReplying } from 'store/emailDetailSlice'
import { useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'

import LinkedContacts from './Recipients/LinkedContacts'
import EmailAttachment from '../../Attachment/EmailAttachment'
import * as S from '../../EmailDetailStyles'
import EmailDetailBody from '../EmailDetailBody/EmailDetailBody'
import RemovedTrackers from '../RemovedTrackers/RemovedTrackers'
import SpecificEmailOptions from '../SpecificEmailOptions'

export interface IReadMessage {
  handleClickListener: ({ mIndex }: { mIndex: number }) => void
  message: TThreadObject['messages'][0]
  messageIndex: number
  setShouldRefreshDetail: Dispatch<SetStateAction<boolean>>
  setUnsubscribeLink: Dispatch<SetStateAction<string | null>>
  threadDetail: TThreadObject | null | undefined
}

const ReadUnreadMessage = ({
  handleClickListener,
  message,
  messageIndex,
  threadDetail,
  setUnsubscribeLink,
  setShouldRefreshDetail,
}: IReadMessage) => {
  const labelIds = useAppSelector(selectLabelIds)
  const [open, setOpen] = useState<boolean>(message && messageIndex === 0)
  const [blockedTrackers, setBlockedTrackers] = useState<string[] | []>([])
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
              <span
                style={{ fontWeight: 'bold' }}
                title={staticSenderNamePartial?.emailAddress ?? ''}
              >
                {staticSenderNamePartial?.name}
              </span>
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

  return (
    <>
      <Seo title={staticEmailSubject} />
      {open && (
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
          {blockedTrackers.length > 0 && (
            <RemovedTrackers blockedTrackers={blockedTrackers} />
          )}
          <S.GreyDivider />
          <S.EmailBody>
            {message && message?.payload && message?.id && (
              <EmailDetailBody
                threadDetailBody={message.payload}
                detailBodyCSS={global.EMAIL_BODY_VISIBLE}
                setUnsubscribeLink={setUnsubscribeLink}
                setBlockedTrackers={setBlockedTrackers}
              />
            )}
          </S.EmailBody>
          <EmailAttachment message={message} />
        </S.EmailOpenWrapper>
      )}
      {!open && memoizedClosedEmail}
    </>
  )
}

export default ReadUnreadMessage
