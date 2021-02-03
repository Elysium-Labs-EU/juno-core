import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './../App.scss'
import styled from 'styled-components'
// import { FiPaperclip } from "react-icons/fi";

import EmailAvatar from './EmailAvatar'
import EmailHasAttachment from './EmailHasAttachment'
import TimeStamp from './TimeStamp'
import MessageCount from './MessageCount'

const ThreadBase = styled.a`
  font-weight: ${(props) => (props.labelIds === 'UNREAD' ? 'bold' : 'regular')};
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
    background-color: #c3c3ca;
    text-decoration: none;
  }
`

const EmailListItem = ({ email }) => {
  console.log('EmailListItem', email)

  return (
    <div>
      <ThreadBase
        href={`mail/${email?.id}`}
        key={email?.id}
        labelIds={email?.messages[0].labelIds[0]}
      >
        <div className="threadRow">
          {/* <LinkWrapper className="g-email-list" href={`${e.id}`} key={e.id} unread={e.messages[0].labelIds.find(e => e.name === 'UNREAD')}></LinkWrapper> */}
          {/* <div className="row pb-2 pt-2 d-flex align-content-center"> */}
          <div className="cellGradientLeft"></div>
          <div className="cellCheckbox"></div>
          <div className="cellName">
            <div className="avatars">
              <EmailAvatar
                avatarURL={
                  email?.messages[0].payload.headers.find(
                    (e) => e.name === 'From'
                  ).value
                }
              />
            </div>
            <span className="text-truncate">
              {
                email?.messages[0].payload.headers.find(
                  (e) => e.name === 'From'
                ).value
              }
            </span>
            <MessageCount countOfMessage={email?.messages} />
          </div>
          <div className="cellMessage">
            <div className="subjectSnippet text-truncate">
              <span className="subject">
                {
                  email?.messages[0].payload.headers.find(
                    (e) => e.name === 'Subject'
                  ).value
                }
              </span>
              <span className="snippet">
                &nbsp;&nbsp;—&nbsp;&nbsp;{email?.messages[0].snippet}
              </span>
            </div>
          </div>

          <div className="cellAttachment">
            {/* <EmailAttachment hasAttachment={e.messages[0].payload} /> */}
            <EmailHasAttachment hasAttachment={email?.messages} />
          </div>
          <div className="cellDate">
            <div className="datePosition">
              <span className="date">
                <TimeStamp threadTimeStamp={email?.messages[0].internalDate} />
              </span>
            </div>
          </div>
          <div></div>
          <div className="cellGradientRight"></div>
          <div className="inlineThreadActions">TA</div>
        </div>
      </ThreadBase>
    </div>
  )
}

export default EmailListItem
