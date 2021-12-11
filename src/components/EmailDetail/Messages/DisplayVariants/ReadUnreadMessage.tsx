import React, { useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import EmailAvatar from '../../../EmailAvatar'
import EmailAttachment from '../../Attachment/EmailAttachment'
import EmailDetailBody from '../EmailDetailBody'
import TimeStamp from '../../../TimeStamp'
import * as local from '../../../../constants/unreadConstants'
import * as S from '../../EmailDetailStyles'
import EmailHasAttachment from '../../../EmailHasAttachment'
import { EmailMessage, EmailListThreadItem } from '../../../../Store/emailListTypes'
import { MessagePayload } from '../../../../Store/draftsTypes'
import SpecificEmailOptions from '../SpecificEmailOptions'
import { CustomIconLink } from '../../../Elements/Buttons'
import { useAppSelector } from '../../../../Store/hooks'
import { selectIsReplying } from '../../../../Store/emailDetailSlice'

const ReadMessage = ({
  message,
  threadDetail,
  FROM,
  isReplyingListener,
  messageIndex
}: {
  message: EmailMessage
  threadDetail: EmailListThreadItem
  FROM: string
  isReplyingListener?: any
  messageIndex: number
}) => {
  const [open, setOpen] = useState<boolean>(
    threadDetail && threadDetail.messages && threadDetail.messages.length > 1
      ? message && message.labelIds?.includes(local.UNREAD)
      : true
  )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const isReplying = useAppSelector(selectIsReplying)

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

  const From = (): string => {
    if (message) {
      if (message.payload.headers) {
        return message.payload.headers.find((e: MessagePayload) => e.name === 'From')
          ? message.payload.headers.find((e: MessagePayload) => e.name === 'From').value
          : message.payload.headers.find((e: MessagePayload) => e.name === 'from').value
      }
      return '(No sender)'
    }
    return '(No sender)'
  }

  const Subject = (): string => {
    if (message) {
      if (message.payload.headers) {
        return message.payload.headers.find((e: MessagePayload) => e.name === 'Subject')
          ? message.payload.headers.find((e: MessagePayload) => e.name === 'Subject').value
          : message.payload.headers.find((e: MessagePayload) => e.name === 'subject').value
      }
      return '(No subject)'
    }
    return '(No subject)'
  }

  const EmailSnippet = (): string => {
    if (message) {
      if (message.snippet) {
        return `${ message.snippet.replace(/^(.{65}[^\s]*).*/, '$1') }...`
      }
      return ''
    }
    return ''
  }

  return (
    <>
      {open && (
        <>
          <S.TopContainer>
            <S.HeaderFullWidth>
              <S.ClickHeader onClick={handleClick} aria-hidden="true">
                <EmailAvatar avatarURL={From()} />
                <span title={Subject()} className="email_detail_title text_truncate">
                  {Subject()}
                </span>
              </S.ClickHeader>
              <S.TimeAttachmentContainer>
                <EmailHasAttachment messages={message} />
                <TimeStamp threadTimeStamp={message.internalDate} />

                <CustomIconLink onClick={handleSpecificMenu('bottom-start')} icon={<FiChevronDown />} className="button" aria-describedby={popperId} />
                <Popper id={popperId} open={showMenu} anchorEl={anchorEl} placement={placement}>
                  <SpecificEmailOptions messageId={message?.id} isReplyingListener={isReplyingListener} messageIndex={messageIndex} />
                </Popper>

              </S.TimeAttachmentContainer>
            </S.HeaderFullWidth>
          </S.TopContainer>
          <S.FromContainer>
            <span className="text_muted text_small" style={{ marginRight: '4px' }}>
              {FROM}
            </span>
            <span className="text_small">{From()}</span>
          </S.FromContainer>
          <S.EmailBody>
            {message && message.payload && message.id && (
              <EmailDetailBody
                threadDetailBody={message.payload}
                messageId={message.id}
              />
            )}
          </S.EmailBody>
          <EmailAttachment message={message} overview={false} />
          <small>{message?.id}</small>
        </>
      )}
      {!open && (
        <div onClick={handleClick} aria-hidden="true">
          <S.ClosedMessageWrapper>
            <S.ClosedAvatarSender>
              <EmailAvatar avatarURL={From()} />
              <S.ClosedSender>
                <span>{From()}</span>
              </S.ClosedSender>
            </S.ClosedAvatarSender>
            <S.ClosedSnippet>{EmailSnippet()}</S.ClosedSnippet>
            <S.TimeAttachmentContainer>
              <EmailHasAttachment messages={message} />
              <TimeStamp threadTimeStamp={message.internalDate} />
            </S.TimeAttachmentContainer>
          </S.ClosedMessageWrapper>
        </div>
      )}
    </>
  )
}

ReadMessage.defaultProps = {
  isReplyingListener: {}
}

export default ReadMessage
