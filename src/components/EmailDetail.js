import './../App.scss'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FiPaperclip } from 'react-icons/fi'

import EmailDetailBody from './EmailDetailBody'
import EmailDetOptions from './EmailDetOptions'
import EmailAvatar from './EmailAvatar'
import EmailAttachment from './EmailAttachment'
import TimeStamp from './TimeStamp'

function EmailDetail() {
  const { threadId } = useParams()
  const [login, setLogin] = useState(null)
  const [threadDetail, setThreadDetail] = useState(null)

  function authenticate() {
    return window.gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          'https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly',
      })
      .then(
        function () {
          console.log('Sign-in successful')
        },
        function (err) {
          console.error('Error signing in', err)
        }
      )
  }

  function loadClient() {
    window.gapi.client.setApiKey(process.env.REACT_APP_GAPI_API_KEY)
    return window.gapi.client
      .load('https://gmail.googleapis.com/$discovery/rest?version=v1')
      .then(
        function () {
          console.log('GAPI client loaded for API')
          setLogin({ login: 'Success' })
        },
        function (err) {
          console.error('Error loading GAPI client for API', err)
        }
      )
  }

  useEffect(() => {
    if (login != null) {
      return window.gapi.client.gmail.users.threads
        .get({
          userId: 'me',
          id: `${threadId}`,
        })

        .then((response) => {
          // console.log(response.result.messages[0].payload.body)
          setThreadDetail(response.result)
        })

        .catch((error) => {
          console.log(error)
        })
    }
  }, [login])


  return (
    <div className="tlOuterContainer">
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => authenticate().then(loadClient)}
      >
        Authorize and load
      </button>
      <div className="detail-row">
        <div className="p-4 mb-3 email-detail-container">
          <div className="detail-base">
            <div className="cardFullWidth">
              {/* <div> */}
              {threadDetail ? (
                threadDetail.messages.map((message) => (
                  <div className="email" key={message.id}>
                    <div className="d-flex align-items-center">
                      <EmailAvatar
                        avatarURL={
                          message.payload.headers.find((e) => e.name === 'From')
                            .value
                        }
                      />
                      <div className="headerFullWidth text-truncate d-flex">
                        <span className="email-detail-title">
                          {
                            message.payload.headers.find(
                              (e) => e.name === 'Subject'
                            ).value
                          }
                        </span>
                        {/* <div className="text-truncate date">{message.payload.headers.find(e => e.name === 'Date').value}</div> */}
                        <div className="ml-auto">
                          <TimeStamp threadTimeStamp={message.internalDate} />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mt-2">
                      <div className="text-truncate email-detail-from">
                        From:{' '}
                        {
                          message.payload.headers.find((e) => e.name === 'From')
                            .value
                        }
                      </div>
                    </div>
                    <div className="EmailBody mt-3 mb-3">
                      <EmailDetailBody
                        className="EmailDetailBody"
                        threadDetailBody={message.payload}
                      />
                    </div>
                    <div className="mt-3 mb-3">
                      <p className="email-detail-from">
                        Message id: {message.id}
                      </p>
                    </div>
                    <EmailAttachment />
                  </div>
                ))
              ) : (
                <p>No email available</p>
              )}
            </div>
          </div>
        </div>
        <EmailDetOptions />
      </div>
    </div>
  )
}

export default EmailDetail
