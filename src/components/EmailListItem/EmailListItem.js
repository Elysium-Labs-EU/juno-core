import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// import './../App.scss'
// import
import styled from 'styled-components'
// import { FiPaperclip } from "react-icons/fi";

import EmailAvatar from '../EmailAvatar'
import EmailHasAttachment from '../EmailHasAttachment'
import TimeStamp from '../TimeStamp'
import MessageCount from '../MessageCount'
import Snippet from './Snippet'
import InlineThreadActions from './InlineThreadActions'

const ThreadBase = styled.a`
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
  const LatestEmail =
    email.message !== undefined ? email.message.messages.slice(-1) : null

  return (
    <>
      <ThreadBase
        href={`mail/${email?.id}`}
        key={email?.id}
        labelIds={LatestEmail[0].labelIds[0]}
      >
        <div className="threadRow">
          {/* <div className="row pb-2 pt-2 d-flex align-content-center"> */}
          <div className="cellGradientLeft"></div>
          <div className="cellCheckbox"></div>
          <div className="cellName">
            <div className="avatars">
              <EmailAvatar
                avatarURL={
                  LatestEmail[0].payload.headers.find(
                    (data) => data.name === 'From'
                  ).value
                }
              />
            </div>
            <span className="text-truncate">
              {
                LatestEmail[0].payload.headers.find(
                  (data) => data.name === 'From'
                ).value
              }
            </span>
            <MessageCount countOfMessage={email?.message.messages} />
          </div>
          <div className="cellMessage">
            <div className="subjectSnippet text-truncate">
              <span className="subject">
                {
                  LatestEmail[0].payload.headers.find(
                    (data) => data.name === 'Subject'
                  ).value
                }
              </span>
              <Snippet email={email?.message.messages} />
            </div>
          </div>

          <div className="cellAttachment">
            <EmailHasAttachment hasAttachment={email?.message.messages} />
          </div>
          <div className="cellDate">
            <div className="datePosition">
              <span className="date">
                <TimeStamp threadTimeStamp={LatestEmail[0].internalDate} />
              </span>
            </div>
          </div>
          <div></div>
          <div className="cellGradientRight"></div>
          {/* <div className="inlineThreadActions">TA</div> */}
          <InlineThreadActions />
        </div>
      </ThreadBase>
    </>
  )
}

export default EmailListItem
