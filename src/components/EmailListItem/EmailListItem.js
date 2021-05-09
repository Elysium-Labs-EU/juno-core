import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styled from 'styled-components'

import EmailAvatar from '../EmailAvatar'
import EmailHasAttachment from '../EmailHasAttachment'
import TimeStamp from '../TimeStamp'
import MessageCount from '../MessageCount'
import Snippet from './Snippet'
import InlineThreadActions from './InlineThreadActions'

const ThreadBase = styled.div`
  font-weight: ${(props) => (props.labelIds === 'UNREAD' ? '500' : 'regular')};
  position: relative;
  user-select: none;
  --line-margin: 30px;
  --padding-left: 30px;
  --padding-right: 30px;
  --primary-text: #535358;
  --mindful-text: #8e8e99;
  --discreet-text: #aeaeb4;
  color: #535358;

  :hover {
    text-decoration: none;
  }
`

const EmailListItem = ({ email }) => {
  const {
    thread,
    thread: { id, messages },
  } = email
  const history = useHistory()

  const LatestEmail =
    thread !== undefined && messages !== undefined ? messages.slice(-1) : thread

  const emailLabels = Array.isArray(LatestEmail)
    ? LatestEmail[0].labelIds[0]
    : LatestEmail.labelIds[0]
  const fromEmail = Array.isArray(LatestEmail)
    ? LatestEmail[0].payload.headers.find((data) => data.name === 'From').value
    : LatestEmail.payload.headers.find((data) => data.name === 'From').value
  const emailSubject = Array.isArray(LatestEmail)
    ? LatestEmail[0].payload.headers.find((data) => data.name === 'Subject')
        .value
    : LatestEmail.payload.headers.find((data) => data.name === 'Subject').value
  const emailSnippet = Array.isArray(LatestEmail)
    ? LatestEmail[0].snippet
    : LatestEmail.snippet
  const timeStamp = Array.isArray(LatestEmail)
    ? LatestEmail[0].internalDate
    : LatestEmail.internalDate

  const handleClick = (id) => {
    history.push(`mail/${id}`)
  }

  return (
    <>
      <ThreadBase key={id} labelIds={emailLabels}>
        <div className="threadRow">
          {/* <div className="row pb-2 pt-2 d-flex align-content-center"> */}
          <div className="cellGradientLeft"></div>
          <div className="cellCheckbox"></div>
          <div className="cellName" onClick={() => handleClick(id)}>
            <div className="avatars">
              <EmailAvatar avatarURL={fromEmail} />
            </div>
            <span className="text-truncate">{fromEmail}</span>
            <MessageCount countOfMessage={messages} />
          </div>
          <div className="cellMessage" onClick={() => handleClick(id)}>
            <div className="subjectSnippet text-truncate">
              <span className="subject">{emailSubject}</span>
              <Snippet snippet={emailSnippet} />
            </div>
          </div>

          <div className="cellAttachment">
            <EmailHasAttachment hasAttachment={messages} />
          </div>
          <div className="cellDate">
            <div className="datePosition">
              <span className="date">
                <TimeStamp threadTimeStamp={timeStamp} />
              </span>
            </div>
          </div>
          <div></div>
          <div className="cellGradientRight"></div>
          {/* <div className="inlineThreadActions">TA</div> */}
          <InlineThreadActions messageId={id} />
        </div>
      </ThreadBase>
    </>
  )
}

export default EmailListItem
