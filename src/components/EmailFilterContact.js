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

//Filter only the messages from a contact

function EmailList() {
  const [email, setEmailList] = useState([])

  //Get initial list of items, newest are loaded first
  useEffect(() => {
    return window.gapi.client.gmail.users.threads
      .list({
        userId: 'me',
        maxResults: 20,
      })
      .then(
        function (response) {
          //The list is enhanced with more data using another call per thread id.
          response.result.threads.forEach((thread) => {
            return window.gapi.client.gmail.users.threads
              .get({
                userId: 'me',
                // "id": `${thread.id}`,
                // "id": "1768c9b7816bed78"
                // "id": "176aae1ffb74cea7"
                id: '176ab48f0c9433d3',
                // "id": "176a5091c294aa1a"
                // "format": "metadata"
              })

              .then(
                function (response) {
                  // console.log("thread.id",thread.id)
                  // console.log("email.id",email.id)

                  //Set the state with the latest emails (first page only) and  filter out duplicate thread ids.

                  //NOTE! This setting should only be triggered whenever the id is different. Right now it is running the code 100 times
                  //to check each line if they aren't duplicate, it should be prevented from running in the first place.
                  //add .sort() functionality

                  if (thread.id !== email.id) {
                    setEmailList((prevState) =>
                      [...prevState, response.result].filter(
                        (email, index, self) => index === self.findIndex((e) => e.id === email.id)
                      )
                    )
                  }

                  // setEmailList(prevState =>
                  //   [...new Set ([...prevState, response.result])])
                },

                function (err) {
                  console.error('Execute error', err)
                }
              )
          })
        },

        function (err) {
          console.error('Execute error', err)
        }
      )
  }, [])

  return (
    <div>
      {/* <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => authenticate().then(loadClient)}
      >
        Authorize and load
      </button> */}

      <div className="scroll">
        <div className="tlOuterContainer">
          <div className="thread-list">
            <div className="base">
              {/* add hover class on this base item */}
              {email ? (
                email.map((e) => (
                  <ThreadBase href={`mail/${e.id}`} key={e.id} labelIds={e.messages[0].labelIds[0]}>
                    <div className="threadRow">
                      {/* <LinkWrapper className="g-email-list" href={`${e.id}`} key={e.id} unread={e.messages[0].labelIds.find(e => e.name === 'UNREAD')}></LinkWrapper> */}
                      {/* <div className="row pb-2 pt-2 d-flex align-content-center"> */}
                      <div className="cellGradientLeft"></div>
                      <div className="cellCheckbox"></div>
                      <div className="cellName">
                        <div className="avatars">
                          <EmailAvatar
                            avatarURL={
                              e.messages[0].payload.headers.find((e) => e.name === 'From').value
                            }
                          />
                        </div>
                        <span className="text-truncate">
                          {e.messages[0].payload.headers.find((e) => e.name === 'From').value}
                        </span>
                        <MessageCount countOfMessage={e.messages} />
                      </div>
                      <div className="cellMessage">
                        <div className="subjectSnippet text-truncate">
                          <span className="subject">
                            {e.messages[0].payload.headers.find((e) => e.name === 'Subject').value}
                          </span>
                          <span className="snippet">
                            &nbsp;&nbsp;—&nbsp;&nbsp;{e.messages[0].snippet}
                          </span>
                        </div>
                      </div>

                      <div className="cellAttachment">
                        {/* <EmailAttachment hasAttachment={e.messages[0].payload} /> */}
                        <EmailHasAttachment hasAttachment={e.messages} />
                      </div>
                      <div className="cellDate">
                        <div className="datePosition">
                          <span className="date">
                            <TimeStamp threadTimeStamp={e.messages[0].internalDate} />
                          </span>
                        </div>
                      </div>
                      <div></div>
                      <div className="cellGradientRight"></div>
                      <div className="inlineThreadActions">TA</div>
                    </div>
                  </ThreadBase>
                  // </div>
                ))
              ) : (
                <p>No email available</p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => loadMore()}>
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailList
