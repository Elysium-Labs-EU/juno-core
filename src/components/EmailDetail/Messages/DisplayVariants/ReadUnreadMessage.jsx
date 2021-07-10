import React, { useState } from 'react'
import EmailAvatar from '../../../EmailAvatar'
import EmailAttachment from '../../Attachment/EmailAttachment'
import EmailDetailBody from '../EmailDetailBody'
import TimeStamp from '../../../TimeStamp'
import * as local from '../../../../constants/unreadConstants'
import * as S from '../EmailDetailStyles'

const ReadMessage = ({ message, FROM, MESSAGE_ID_LABEL }) => {
  const [open, setOpen] = useState(
    message && message.labelIds.includes(local.UNREAD)
  )

  const handleClick = () => {
    setOpen((currState) => !currState)
  }

  const AvatarURL =
    message && message.payload.headers.find((e) => e.name === 'From').value

  const Subject =
    message && message.payload.headers.find((e) => e.name === 'Subject').value

  const From =
    message && message.payload.headers.find((e) => e.name === 'From').value

  const EmailSnippet =
    message && `${message.snippet.replace(/^(.{65}[^\s]*).*/, '$1')}` + `...`

  return (
    <>
      {open && (
        <>
          <div onClick={handleClick} aria-hidden="true">
            <S.AvatarHeaderContainer>
              <EmailAvatar avatarURL={AvatarURL} />
              <S.HeaderFullWidth>
                <span className="email-detail-title">{Subject}</span>
                <div
                  className="ml-auto"
                  style={{ display: 'flex', flexFlow: 'column' }}
                >
                  <TimeStamp threadTimeStamp={message.internalDate} />
                  {message.labelIds.includes('UNREAD') && <p>Unread message</p>}
                  {!message.labelIds.includes('DRAFT' || 'UNREAD') && (
                    <p>Read message</p>
                  )}
                </div>
              </S.HeaderFullWidth>
            </S.AvatarHeaderContainer>
            <S.FromContainer>
              <p className="text-muted">
                {FROM} <span className="text_normal">{From}</span>
              </p>
            </S.FromContainer>
            <S.EmailBody>
              <EmailDetailBody
                className="EmailDetailBody"
                threadDetailBody={message.payload}
                messageId={message.id}
              />
            </S.EmailBody>
            <div>
              <p className="email-detail-from">
                {MESSAGE_ID_LABEL} {message.id}
              </p>
            </div>
          </div>
          <EmailAttachment message={message} />
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
            <TimeStamp threadTimeStamp={message.internalDate} />
          </S.ClosedMessageWrapper>
        </div>
      )}
    </>
  )
}

export default ReadMessage
