import '../../App.scss'
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { FiPaperclip } from 'react-icons/fi'
import './EmailDetail.scss'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { setCurrentEmail } from '../../Store/emailDetailSlice'
import { selectIsLoading, setServiceUnavailable } from '../../Store/utilsSlice'
import { selectLabelIds, setCurrentLabels } from '../../Store/labelsSlice'
import EmailDetOptions from './EmailDetOptions'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import { EmailWrapper } from './EmailDetailStyles'
import { selectEmailList } from '../../Store/emailListSlice'

const FROM = 'From'
const MESSAGE_ID_LABEL = 'Message ID:'
const ERROR_EMAIL = 'Error loading email'

const EmailDetail = () => {
  const emailList = useSelector(selectEmailList)
  const isLoading = useSelector(selectIsLoading)
  const labelIds = useSelector(selectLabelIds)
  const dispatch = useDispatch()
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
      return (
        <DraftMessage
          message={message}
          FROM={FROM}
          MESSAGE_ID_LABEL={MESSAGE_ID_LABEL}
          threadDetail={threadDetail}
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
                  <EmailWrapper key={message.id} labelIds={message.labelIds}>
                    {detailDisplaySelector(message)}
                  </EmailWrapper>
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

export default EmailDetail
