import React, { useState } from 'react'
import EmailAvatar from '../../../EmailAvatar'
import EmailAttachment from '../../Attachment/EmailAttachment'
import EmailDetailBody from '../EmailDetailBody'
import TimeStamp from '../../../TimeStamp'
import * as local from '../../../../constants/unreadConstants'
import * as S from '../../EmailDetailStyles'
import EmailHasAttachment from '../../../EmailHasAttachment'
import { EmailMessage, EmailListThreadItem } from '../../../../Store/emailListTypes'
import { MessagePayload } from '../../../../Store/draftsTypes'

const ReadMessage = ({ message, threadDetail, FROM }: { message: EmailMessage, threadDetail: EmailListThreadItem, FROM: string }) => {
  const [open, setOpen] = useState(
    threadDetail && threadDetail.messages && threadDetail.messages.length > 1
      ? message && message.labelIds.includes(local.UNREAD)
      : true
  )

  const handleClick = () => {
    setOpen((currState) => !currState)
  }

  const AvatarURL =
    message && message.payload.headers.find((e: MessagePayload) => e.name === 'From').value

  const Subject =
    message && message.payload.headers.find((e: MessagePayload) => e.name === 'Subject').value

  const From =
    message && message.payload.headers.find((e: MessagePayload) => e.name === 'From').value

  const EmailSnippet =
    message && `${ message.snippet.replace(/^(.{65}[^\s]*).*/, '$1') }...`

  return (
    <>
      {open && (
        <>
          <div onClick={handleClick} aria-hidden="true">
            <S.AvatarHeaderContainer>
              <EmailAvatar avatarURL={AvatarURL} />
              <S.HeaderFullWidth>
                <span
                  title={Subject}
                  className="email_detail_title text_truncate"
                >
                  {Subject}
                </span>
                <S.TimeAttachmentContainer>
                  <EmailHasAttachment messages={message} />
                  <TimeStamp threadTimeStamp={message.internalDate} />
                </S.TimeAttachmentContainer>
              </S.HeaderFullWidth>
            </S.AvatarHeaderContainer>
            <S.FromContainer>
              <span
                className="text_muted text_small"
                style={{ marginRight: '4px' }}
              >
                {FROM}
              </span>
              <span className="text_small">{From}</span>
            </S.FromContainer>
            <S.EmailBody>
              <EmailDetailBody
                // className="EmailDetailBody"
                threadDetailBody={message.payload}
                messageId={message.id}
              />
            </S.EmailBody>
          </div>
          <EmailAttachment message={message} overview={false} />
          <small>{message?.id}</small>
        </>
      )}
      {!open && (
        <div onClick={handleClick} aria-hidden="true">
          <S.ClosedMessageWrapper>
            <S.ClosedAvatarSender>
              <EmailAvatar avatarURL={AvatarURL} />
              <S.ClosedSender>
                <span>{From}</span>
              </S.ClosedSender>
            </S.ClosedAvatarSender>
            <S.ClosedSnippet>{EmailSnippet}</S.ClosedSnippet>
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

export default ReadMessage
