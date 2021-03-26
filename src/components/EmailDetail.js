import './../App.scss'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FiPaperclip } from 'react-icons/fi'

import { createApiClient } from '../data/api'
import EmailDetailBody from './EmailDetailBody'
import EmailDetOptions from './EmailDetOptions'
import EmailAvatar from './EmailAvatar'
import EmailAttachment from './EmailAttachment'
import TimeStamp from './TimeStamp'

const api = createApiClient()

function EmailDetail() {
  const { threadId } = useParams()
  const [threadDetail, setThreadDetail] = useState(null)

  useEffect(() => {
    const LoadEmail = async () => {
      const threadDetailFeed = await api.getMessageDetail(`${threadId}`)
      setThreadDetail(threadDetailFeed || 'No email loaded')
      console.log(threadDetailFeed)
    }
    LoadEmail()
  }, [threadId])

  return (
    <div className="tlOuterContainer">
      <div className="detail-row">
        <div className="p-4 mb-3 email-detail-container">
          <div className="detail-base">
            <div className="cardFullWidth">
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
