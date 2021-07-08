import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import '../../App.scss'
import './EmailDetail.scss'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { setCurrentEmail } from '../../Store/emailDetailSlice'
import {
  selectIsLoading,
  selectServiceUnavailable,
  setServiceUnavailable,
} from '../../Store/utilsSlice'
import { selectLabelIds, setCurrentLabels } from '../../Store/labelsSlice'
import EmailDetOptions from './EmailDetOptions'
import DraftMessage from './DisplayVariants/DraftMessage'
import ReadUnreadMessage from './DisplayVariants/ReadUnreadMessage'
import { EmailWrapper } from './EmailDetailStyles'
import { selectEmailList } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import * as draft from '../../constants/draftConstants'
import * as S from './EmailDetailStyles'
import * as GS from '../../styles/globalStyles'
import ComposeEmail from '../Compose/ComposeEmail'
import { findPayloadHeadersData } from '../../utils'
import { CustomButton } from '../Elements/Buttons'

const EmailDetail = () => {
  const emailList = useSelector(selectEmailList)
  const isLoading = useSelector(selectIsLoading)
  const labelIds = useSelector(selectLabelIds)
  const serviceUnavailable = useSelector(selectServiceUnavailable)
  const dispatch = useDispatch()
  const location = useLocation()
  const { threadId } = useParams()
  const [threadDetail, setThreadDetail] = useState(null)
  const [isReplying, setIsReplying] = useState(false)
  const localLabels = useRef([])

  const isReplyingListener = () => {
    setIsReplying((prevState) => !prevState)
  }

  const fromEmail = () => {
    const query = 'From'
    if (threadDetail) {
      return findPayloadHeadersData({ threadDetail, query })
    }
    return null
  }

  const emailSubject = () => {
    const query = 'Subject'
    if (threadDetail) {
      return findPayloadHeadersData({ threadDetail, query })
    }
    return null
  }

  const fetchEmailDetail = () => {
    if (labelIds && threadId) {
      const activeList =
        emailList &&
        emailList.filter((list) => list.labels.includes(...labelIds))
      const activeEmail =
        activeList &&
        activeList[0].threads.filter((item) => item.id === threadId)
      setThreadDetail(activeEmail[0])
      if (serviceUnavailable && serviceUnavailable.length > 0) {
        dispatch(setServiceUnavailable(null))
      }
    } else {
      dispatch(setServiceUnavailable(local.ERROR_EMAIL))
    }
  }

  useEffect(() => {
    if (threadId) {
      if (labelIds && labelIds === localLabels.current) {
        emailList.length > 0 && fetchEmailDetail({ threadId, labelIds })
      } else {
        const newLabelIds = [location.pathname.split('/')[2]]
        dispatch(setCurrentLabels(newLabelIds))
        localLabels.current = newLabelIds
        emailList.length > 0 && fetchEmailDetail({ threadId, newLabelIds })
      }
    }
  }, [labelIds, emailList, threadId])
  // DetailNavigation will refetch metaList + emailList if empty.

  useEffect(() => {
    if (threadId !== undefined) {
      dispatch(setCurrentEmail(threadId))
    }
  }, [threadId])

  const detailDisplaySelector = (message) => {
    if (message.labelIds.includes(draft.LABEL)) {
      return (
        <DraftMessage
          message={message}
          MESSAGE_ID_LABEL={local.MESSAGE_ID_LABEL}
          threadDetail={threadDetail}
        />
      )
    }
    if (!message.labelIds.includes(draft.LABEL)) {
      return (
        <ReadUnreadMessage
          message={message}
          FROM={local.FROM}
          MESSAGE_ID_LABEL={local.MESSAGE_ID_LABEL}
        />
      )
    }
    return null
  }

  return (
    <GS.OuterContainer isReplying={isReplying}>
      <S.DetailRow>
        <S.EmailDetailContainer isReplying={isReplying}>
          <S.DetailBase>
            <S.CardFullWidth>
              {threadDetail &&
                !isLoading &&
                threadDetail.messages
                  .slice(0)
                  .reverse()
                  .map((message) => (
                    <EmailWrapper key={message.id} labelIds={message.labelIds}>
                      {detailDisplaySelector(message)}
                    </EmailWrapper>
                  ))}
              {!threadDetail && (
                <S.LoadingErrorWrapper>
                  {isLoading && <CircularProgress />}
                  {!isLoading && <p>{local.ERROR_EMAIL}</p>}
                </S.LoadingErrorWrapper>
              )}
            </S.CardFullWidth>
          </S.DetailBase>
        </S.EmailDetailContainer>
        {threadDetail && !isReplying && (
          <EmailDetOptions
            messageId={threadDetail.id}
            setReply={isReplyingListener}
          />
        )}
      </S.DetailRow>
      {isReplying && (
        <>
          <ComposeEmail
            isReplying={isReplying}
            isReplyingListener={isReplyingListener}
            to={fromEmail()}
            subject={emailSubject()}
            id={threadDetail.id}
            threadId={
              threadDetail.messages[threadDetail.messages.length - 1].threadId
            }
          />
        </>
      )}
    </GS.OuterContainer>
  )
}

export default EmailDetail
