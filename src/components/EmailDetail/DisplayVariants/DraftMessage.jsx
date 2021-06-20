import React from 'react'
import EmailAvatar from '../../EmailAvatar'
import EmailAttachment from '../../EmailAttachment'
import EmailDetailBody from '../EmailDetailBody'
import TimeStamp from '../../TimeStamp'

const DraftMessage = ({ message, FROM, MESSAGE_ID_LABEL }) => {
  console.log(message)
  return (
    <>
      <div className="d-flex align-items-center">
        <EmailAvatar
          avatarURL={
            message.payload.headers.find((e) => e.name === 'From').value
          }
        />
        <div className="headerFullWidth text-truncate d-flex">
          <span className="email-detail-title">
            {message.payload.headers.find((e) => e.name === 'Subject').value}
          </span>
          <div
            className="ml-auto"
            style={{ display: 'flex', flexFlow: 'column' }}
          >
            <TimeStamp threadTimeStamp={message.internalDate} />
            {/* {message.labelIds.includes('DRAFT') && (
                            <small>Draft</small>
                          )} */}
            {message.labelIds.includes('DRAFT') && <p>Draft message</p>}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center mt-2">
        <div className="text-truncate email-detail-from">
          {FROM}{' '}
          <span>
            {message.payload.headers.find((e) => e.name === 'From').value}
          </span>
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
      <EmailAttachment message={message} />
    </>
  )
}

export default DraftMessage
