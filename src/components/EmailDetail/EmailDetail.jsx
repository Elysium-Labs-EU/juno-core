import '../../App.scss'
import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

import { FiPaperclip } from 'react-icons/fi'
import './EmailDetail.scss'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  setCurrentEmail,
  setCurrentLabels,
  setServiceUnavailable,
} from '../../Store/actions'
import EmailDetOptions from './EmailDetOptions'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'

const FROM = 'From'
const MESSAGE_ID_LABEL = 'Message ID:'
const ERROR_EMAIL = 'Error loading email'

const mapStateToProps = (state) => {
  const { emailList, isLoading, threadId, labelIds } = state
  return { emailList, isLoading, threadId, labelIds }
}

const EmailDetail = ({ dispatch, emailList, isLoading, labelIds }) => {
  const location = useLocation()
  const { threadId } = useParams()
  const [threadDetail, setThreadDetail] = useState(null)

  const fetchEmailDetail = () => {
    if (labelIds && threadId) {
      const activeList =
        emailList &&
        emailList.filter((list) => list.labels.includes(...labelIds))
      const activeEmail =
        activeList &&
        activeList[0].threads.filter((item) => item.id === threadId)
      setThreadDetail(activeEmail[0])
    } else {
      dispatch(setServiceUnavailable(ERROR_EMAIL))
    }
  }

  useEffect(() => {
    if (threadId !== undefined) {
      dispatch(setCurrentEmail(threadId))
      if (labelIds) {
        dispatch(setCurrentLabels(labelIds))
        fetchEmailDetail({ threadId, labelIds })
      } else {
        const newLabelIds = [location.pathname.split('/')[2]]
        dispatch(setCurrentLabels(newLabelIds))
        fetchEmailDetail({ threadId, labelIds })
      }
    }
  }, [threadId])

  const detailDisplaySelector = (message) => {
    if (message.labelIds.includes('DRAFT')) {
      console.log('Draft message')
      return (
        <DraftMessage
          message={message}
          FROM={FROM}
          MESSAGE_ID_LABEL={MESSAGE_ID_LABEL}
        />
      )
    }
    if (!message.labelIds.includes('DRAFT')) {
      return (
        <ReadUnreadMessage
          message={message}
          FROM={FROM}
          MESSAGE_ID_LABEL={MESSAGE_ID_LABEL}
        />
      )
    }
    return null
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
                    {detailDisplaySelector(message)}
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
