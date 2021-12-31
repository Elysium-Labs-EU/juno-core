import React, { useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import EmailAvatar from '../../../Elements/Avatar/EmailAvatar'
import EmailAttachment from '../../Attachment/EmailAttachment'
import EmailDetailBody from '../EmailDetailBody'
import TimeStamp from '../../../Elements/TimeStamp/TimeStampDisplay'
import * as local from '../../../../constants/unreadConstants'
import * as compose from '../../../../constants/composeEmailConstants'
import * as S from '../../EmailDetailStyles'
import EmailHasAttachment from '../../../Elements/EmailHasAttachment'
import { EmailMessage, EmailListThreadItem } from '../../../../Store/emailListTypes'
import SpecificEmailOptions from '../SpecificEmailOptions'
import { CustomIconLink } from '../../../Elements/Buttons'
import { useAppSelector } from '../../../../Store/hooks'
import { selectIsReplying } from '../../../../Store/emailDetailSlice'
import SenderNamePartial from '../../../Elements/SenderName/senderNamePartial'
import SenderNameFull from '../../../Elements/SenderName/senderNameFull'
import EmailSubject from '../../../Elements/EmailSubject'
import EmailSnippet from '../../../Elements/EmailSnippet'
import BCCNameFull from '../../../Elements/BCCNameFull'
import convertToContact from '../../../../utils/convertToContact'
import { selectProfile } from '../../../../Store/baseSlice'

interface IReadMessage {
  message: EmailMessage
  threadDetail: EmailListThreadItem
  FROM: string
  isReplyingListener?: Function
  messageIndex: number
}

const ReadMessage = ({
  message,
  threadDetail,
  FROM,
  isReplyingListener,
  messageIndex
}: IReadMessage) => {
  const [open, setOpen] = useState<boolean>(message && messageIndex === 0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const isReplying = useAppSelector(selectIsReplying)
  const { emailAddress } = useAppSelector(selectProfile)

  useEffect(() => {
    if (threadDetail && threadDetail.messages) {
      if (threadDetail.messages.length > 1) {
        if (message && message.labelIds?.includes(local.UNREAD)) {
          setOpen(true)
          return
        }
        if (message && !Object.prototype.hasOwnProperty.call(message, 'labelIds') && messageIndex === 0) {
          setOpen(true)
          return
        }
      }
      if (threadDetail.messages.length === 1) {
        setOpen(true)
      }
    }
  }, [])

  const handleSpecificMenu =
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
        setShowMenu((prev) => placement !== newPlacement || !prev)
        setPlacement(newPlacement)
      }
  const popperId = showMenu ? 'specifc-email-popper' : undefined

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


  const staticSenderNameFull = SenderNameFull(message, emailAddress)
  const staticSenderNamePartial = SenderNamePartial(message, emailAddress)
  const staticCCNameFull = BCCNameFull(message, 'Cc')
  const staticBCCNameFull = BCCNameFull(message, 'Bcc')
  const staticEmailSubject = EmailSubject(message)
  const staticSnippet = EmailSnippet(message)

  return (
    <>
      {open && (
        <S.EmailOpenWrapper>
          <S.TopContainer>
            <S.HeaderFullWidth>
              <S.ClickHeader onClick={handleClick} aria-hidden="true">
                <EmailAvatar avatarURL={staticSenderNameFull} />
                <span title={staticEmailSubject} className="email_detail_title text_truncate">
                  {staticEmailSubject}
                </span>
              </S.ClickHeader>
              <S.TimeAttachmentContainer>
                <EmailHasAttachment messages={message} />
                <TimeStamp threadTimeStamp={message.internalDate} />

                <CustomIconLink onClick={handleSpecificMenu('bottom-start')} icon={<FiChevronDown />} className="juno-button" aria-describedby={popperId} />
                <Popper id={popperId} open={showMenu} anchorEl={anchorEl} placement={placement}>
                  <SpecificEmailOptions messageId={message?.id} isReplyingListener={isReplyingListener} messageIndex={messageIndex} />
                </Popper>

              </S.TimeAttachmentContainer>
            </S.HeaderFullWidth>
          </S.TopContainer>

          <S.FromCCContainer multipleComponents={Boolean(staticSenderNameFull && (staticCCNameFull || staticBCCNameFull))}>
            <S.FromBCCInner>
              <span className="text_muted text_small" style={{ marginRight: '4px' }}>
                {FROM}
              </span>
              <span className="text_small truncate">{staticSenderNameFull}</span>
            </S.FromBCCInner>
            {staticCCNameFull && staticCCNameFull.length > 0 &&
              <S.FromBCCInner>
                <span className="text_muted text_small" style={{ marginRight: '4px' }}>
                  {compose.CC_LABEL}
                </span>
                <span className="text_small truncate" title={convertToContact(staticCCNameFull).emailAddress}>{convertToContact(staticCCNameFull).name}</span>
              </S.FromBCCInner>}
            {staticBCCNameFull && staticBCCNameFull.length > 0 &&
              <S.FromBCCInner>
                <span className="text_muted text_small" style={{ marginRight: '4px' }}>
                  {compose.BCC_LABEL}
                </span>
                <span className="text_small truncate" title={convertToContact(staticBCCNameFull).emailAddress}>{convertToContact(staticBCCNameFull).name}</span>
              </S.FromBCCInner>}
          </S.FromCCContainer>

          <S.EmailBody>
            {message && message.payload && message.id && (
              <EmailDetailBody
                threadDetailBody={message.payload}
                messageId={message.id}
              />
            )}
          </S.EmailBody>
          <EmailAttachment message={message} />
        </S.EmailOpenWrapper>
      )}
      {!open && (
        <S.EmailClosedWrapper onClick={handleClick} aria-hidden="true">
          <S.ClosedMessageWrapper>
            <S.ClosedAvatarSender>
              <EmailAvatar avatarURL={staticSenderNameFull} />
              <S.ClosedSender>
                <span className="text_normal text_bold" title={staticSenderNamePartial.emailAddress}>{staticSenderNamePartial.name}</span>
              </S.ClosedSender>
            </S.ClosedAvatarSender>
            <S.ClosedSnippet>{staticSnippet}</S.ClosedSnippet>
            <S.TimeAttachmentContainer>
              <EmailHasAttachment messages={message} />
              <TimeStamp threadTimeStamp={message.internalDate} />
            </S.TimeAttachmentContainer>
          </S.ClosedMessageWrapper>
        </S.EmailClosedWrapper>
      )}
    </>
  )
}

ReadMessage.defaultProps = {
  isReplyingListener: {}
}

export default ReadMessage
