import './../../App.scss'
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FiPaperclip } from 'react-icons/fi'
import './EmailDetail.scss'
import { setCurrentEmail, setCurrentLabels, setServiceUnavailable } from '../../Store/actions'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmailDetailBody from './EmailDetailBody'
import EmailDetOptions from './EmailDetOptions'
import EmailAvatar from '../EmailAvatar'
import EmailAttachment from '../EmailAttachment'
import TimeStamp from '../TimeStamp'

const ERROR_EMAIL = 'Error loading email'

const mapStateToProps = (state) => {
  const { emailList, isLoading, threadId, labelIds } = state
  return { emailList, isLoading, threadId, labelIds }
}

const EmailDetail = ({ dispatch, emailList, isLoading, labelIds }) => {
  const location = useLocation()
  const { threadId } = useParams()
  const [threadDetail, setThreadDetail] = useState(null)

  useEffect(() => {
    if (threadId !== undefined) {
      dispatch(setCurrentEmail(threadId))
      if (labelIds) {
        dispatch(setCurrentLabels(labelIds))
        fetchEmailDetail({ threadId, labelIds })
      } else {
        let labelIds = [location.pathname.split('/')[2]]
        dispatch(setCurrentLabels(labelIds))
        fetchEmailDetail({ threadId, labelIds })
      }
    }
  }, [threadId])

  const fetchEmailDetail = (props) => {
    const { labelIds, threadId } = props
    if (labelIds && threadId) {
      const activeList =
        emailList &&
        emailList.filter((list) => list.labels.includes(...labelIds))
      const activeEmail =
        activeList &&
        activeList[0].threads.filter((item) => item.thread.id === threadId)
      setThreadDetail(activeEmail[0].thread)
    } else {
      dispatch(setServiceUnavailable(ERROR_EMAIL))
    }
  }

  return (
    <div className="tlOuterContainer">
      <div className="detail-row">
        <div className="pb-4 pt-4 mb-3 email-detail-container">
          <div className="detail-base">
            <div className="cardFullWidth">
              {threadDetail &&
                !isLoading &&
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
              {!threadDetail && !isLoading && <p>{ERROR_EMAIL}</p>}
            </div>
          </div>
        </div>
        {threadDetail && <EmailDetOptions messageId={threadDetail.id} />}
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(EmailDetail)
