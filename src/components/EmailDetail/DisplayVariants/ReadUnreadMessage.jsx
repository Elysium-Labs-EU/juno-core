import React, { useState } from 'react'
import EmailAvatar from '../../EmailAvatar'
import EmailAttachment from '../Attachment/EmailAttachment'
import EmailDetailBody from '../EmailDetailBody'
import TimeStamp from '../../TimeStamp'
import * as local from '../../../constants/unreadConstants'

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
            <div className="d-flex align-items-center">
              <EmailAvatar avatarURL={AvatarURL} />
              <div className="headerFullWidth text-truncate d-flex">
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
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              <div className="text-truncate email-detail-from">
                {FROM} <span>{From}</span>
              </div>
            </div>
            <div className="EmailBody mt-3 mb-3">
              <EmailDetailBody
                className="EmailDetailBody"
                threadDetailBody={message.payload}
                messageId={message.id}
              />
            </div>
            <div className="mt-3 mb-3">
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
          <div className="d-flex align-items-center closed-message">
            <div className="d-flex align-content-center">
              <EmailAvatar avatarURL={AvatarURL} />
              <div className="d-flex align-items-center ml-2 mt-2">
                <div className="text-truncate email-detail-from">
                  <span>{From}</span>
                </div>
              </div>
            </div>
            {EmailSnippet}
            <TimeStamp threadTimeStamp={message.internalDate} />
          </div>
        </div>
      )}
    </>
  )
}

export default ReadMessage
