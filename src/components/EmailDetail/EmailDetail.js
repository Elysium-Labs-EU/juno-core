import './../../App.scss'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FiPaperclip } from 'react-icons/fi'
import './EmailDetail.scss'
import { setCurrentEmail } from '../../Store/actions'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import { createApiClient } from './../../data/api'
import EmailDetailBody from './EmailDetailBody'
import EmailDetOptions from './EmailDetOptions'
import EmailAvatar from '../EmailAvatar'
import EmailAttachment from '../EmailAttachment'
import TimeStamp from '../TimeStamp'

const api = createApiClient()

const mapStateToProps = (state) => {
  const { emailList, isLoading, threadId } = state
  return { emailList, isLoading, threadId }
}

const EmailDetail = ({ dispatch, emailList, isLoading }) => {
  const { threadId } = useParams()
  const [threadDetail, setThreadDetail] = useState(null)

  useEffect(() => {
    const LoadEmail = async () => {
      if (emailList.length > 0) {
        const activeEmail = await emailList.filter(
          (item) => item.thread.id === threadId
        )
        setThreadDetail(activeEmail[0].thread)
      } else {
        const threadDetailFeed = await api.getThreadDetail(`${threadId}`)
        setThreadDetail(threadDetailFeed.thread || 'No email loaded')
      }
    }
    LoadEmail()
    if (threadId !== undefined) {
      dispatch(setCurrentEmail(threadId))
    }
  }, [threadId])

  return (
    <div className="tlOuterContainer">
      <div className="detail-row">
        <div className="pb-4 pt-4 mb-3 email-detail-container">
          <div className="detail-base">
            <div className="cardFullWidth">
              {threadDetail && !isLoading &&
                threadDetail.messages.map((message) => (
                  <div className="p-4 mb-1 email" key={message.id}>
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
                        From{' '}
                        <span>
                          {
                            message.payload.headers.find(
                              (e) => e.name === 'From'
                            ).value
                          }
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
                        Message id: {message.id}
                      </p>
                    </div>
                    <EmailAttachment message={message} />
                  </div>
                ))}
              {!threadDetail && isLoading && <CircularProgress />}
            </div>
          </div>
        </div>
        {threadDetail && <EmailDetOptions messageId={threadDetail.id} />}
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(EmailDetail)
