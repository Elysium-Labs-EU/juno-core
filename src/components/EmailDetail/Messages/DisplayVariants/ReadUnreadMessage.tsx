import { useEffect, useMemo, useState } from 'react'
import * as React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import EmailAvatar from '../../../Elements/Avatar/EmailAvatar'
import EmailAttachment from '../../Attachment/EmailAttachment'
import EmailDetailBody from '../EmailDetailBody/EmailDetailBody'
import TimeStamp from '../../../Elements/TimeStamp/TimeStampDisplay'
import * as local from '../../../../constants/unreadConstants'
import * as S from '../../EmailDetailStyles'
import * as global from '../../../../constants/globalConstants'
import EmailHasAttachment from '../../../Elements/EmailHasAttachment'
import {
  IEmailMessage,
  IEmailListThreadItem,
} from '../../../../store/storeTypes/emailListTypes'
import SpecificEmailOptions from '../SpecificEmailOptions'
import CustomIconButton from '../../../Elements/Buttons/CustomIconButton'
import { useAppSelector } from '../../../../store/hooks'
import { selectIsReplying } from '../../../../store/emailDetailSlice'
import SenderNamePartial from '../../../Elements/SenderName/senderNamePartial'
import SenderNameFull from '../../../Elements/SenderName/senderNameFull'
import EmailSubject from '../../../Elements/EmailSubject'
import EmailSnippet from '../../../Elements/EmailSnippet'
import { selectProfile } from '../../../../store/baseSlice'
import Seo from '../../../Elements/Seo'
import RemovedTrackers from '../RemovedTrackers/RemovedTrackers'
import useClickOutside from '../../../../hooks/useClickOutside'
import LinkedContacts from './Recipients/LinkedContacts'

interface IReadMessage {
  message: IEmailMessage
  threadDetail: IEmailListThreadItem
  messageIndex: number
  setUnsubscribeLink: (value: string | null) => void
  setContentRendered: (value: boolean) => void
}

const ReadUnreadMessage = ({
  message,
  threadDetail,
  messageIndex,
  setUnsubscribeLink,
  setContentRendered,
}: IReadMessage) => {
  const [open, setOpen] = useState<boolean>(message && messageIndex === 0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [blockedTrackers, setBlockedTrackers] = useState<Attr[] | []>([])
  const isReplying = useAppSelector(selectIsReplying)
  const { emailAddress } = useAppSelector(selectProfile)
  const { ref } = useClickOutside({
    onClickOutside: () => {
      setAnchorEl(null)
      setShowMenu(false)
    },
  })

  useEffect(() => {
    let mounted = true
    if (threadDetail && threadDetail.messages) {
      if (threadDetail.messages.length > 1 && mounted) {
        if (message && message.labelIds?.includes(local.UNREAD)) {
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
        threadDetail.messages.length === 2 &&
        threadDetail.messages.some((item) =>
          item.labelIds.includes(global.DRAFT_LABEL)
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

  const handleSpecificMenu =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
      setShowMenu((prev) => placement !== newPlacement || !prev)
      setPlacement(newPlacement)
    }
  const popperId = showMenu ? 'specifc-email-popper' : undefined

  /**
   * Open or close the email detail - if there is a Popper active, close it.
   */
  const handleClick = () => {
    setOpen((currState) => !currState)
    if (anchorEl) {
      setAnchorEl(null)
      setShowMenu(false)
    }
  }

  useEffect(() => {
    if (isReplying) {
      setAnchorEl(null)
      setShowMenu(false)
    }
  }, [isReplying])

  const staticSenderNameFull = useMemo(
    () => SenderNameFull(message, emailAddress),
    []
  )
  const staticSenderNamePartial = useMemo(
    () => SenderNamePartial(message, emailAddress),
    []
  )
  const staticEmailSubject = useMemo(() => EmailSubject(message), [])
  const staticSnippet = useMemo(() => EmailSnippet(message), [])

  const memoizedClosedEmail = useMemo(
    () => (
      <S.EmailClosedWrapper onClick={handleClick} aria-hidden="true">
        <S.ClosedMessageWrapper>
          <S.ClosedAvatarSender>
            <EmailAvatar avatarURL={staticSenderNameFull} />
            <S.ClosedSender>
              <span
                style={{ fontWeight: 'bold' }}
                title={staticSenderNamePartial?.emailAddress}
              >
                {staticSenderNamePartial?.name}
              </span>
            </S.ClosedSender>
          </S.ClosedAvatarSender>
          <S.ClosedSnippet>{staticSnippet}</S.ClosedSnippet>
          <S.TimeAttachmentContainer>
            <S.ChildDiv>
              <EmailHasAttachment messages={message} />
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
                <EmailAvatar avatarURL={staticSenderNameFull} />
                <S.EmailDetailTitle title={staticEmailSubject}>
                  {staticEmailSubject}
                </S.EmailDetailTitle>
              </S.ClickHeader>
              <S.TimeAttachmentContainer>
                <S.ChildDiv>
                  <EmailHasAttachment messages={message} />
                </S.ChildDiv>
                <S.ChildDiv>
                  <TimeStamp threadTimeStamp={message.internalDate} />
                </S.ChildDiv>
                <S.ChildDiv>
                  <CustomIconButton
                    onClick={handleSpecificMenu('bottom-start')}
                    icon={<FiChevronDown />}
                    aria-describedby={popperId}
                    title="Show message options"
                  />
                </S.ChildDiv>
                <Popper
                  id={popperId}
                  open={showMenu}
                  anchorEl={anchorEl}
                  placement={placement}
                  ref={ref}
                >
                  <SpecificEmailOptions
                    messageId={message?.id}
                    messageIndex={messageIndex}
                  />
                </Popper>
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
                messageId={message.id}
                detailBodyCSS={global.EMAIL_BODY_VISIBLE}
                setUnsubscribeLink={setUnsubscribeLink}
                setContentRendered={setContentRendered}
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
