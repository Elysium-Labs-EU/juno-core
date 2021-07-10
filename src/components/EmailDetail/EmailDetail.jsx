import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import '../../App.scss'
import './Messages/EmailDetail.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentEmail,
  selectIsReplying,
  setCurrentEmail,
  setIsReplying,
} from '../../Store/emailDetailSlice'
import {
  selectIsLoading,
  selectServiceUnavailable,
  setServiceUnavailable,
} from '../../Store/utilsSlice'
import { selectLabelIds, setCurrentLabels } from '../../Store/labelsSlice'
import { selectEmailList } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import * as GS from '../../styles/globalStyles'
import MessagesOverview from './Messages/MessagesOverview'
import FilesOverview from './Files/FilesOverview'
// import InformationOverview from './Information/InformationOverview'

const EmailDetail = () => {
  const currentEmail = useSelector(selectCurrentEmail)
  const emailList = useSelector(selectEmailList)
  const isLoading = useSelector(selectIsLoading)
  const labelIds = useSelector(selectLabelIds)
  const serviceUnavailable = useSelector(selectServiceUnavailable)
  const isReplying = useSelector(selectIsReplying)
  const dispatch = useDispatch()
  const location = useLocation()
  const { threadId, overviewId } = useParams()
  const [threadDetail, setThreadDetail] = useState({})
  const localLabels = useRef([])

  const isReplyingListener = () => {
    dispatch(setIsReplying(!isReplying))
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
    if (threadId !== undefined && currentEmail !== threadId) {
      dispatch(setCurrentEmail(threadId))
    }
  }, [threadId])

  useEffect(() => {
    if (currentEmail !== threadId) {
      dispatch(setIsReplying(false))
    }
  }, [threadId])

  return (
    <GS.OuterContainer isReplying={isReplying}>
      {overviewId === local.MESSAGES && (
        <MessagesOverview
          threadDetail={threadDetail}
          isLoading={isLoading}
          isReplying={isReplying}
          isReplyingListener={isReplyingListener}
        />
      )}
      {overviewId === local.FILES && (
        <FilesOverview threadDetail={threadDetail} isLoading={isLoading} />
      )}
      {/* {overviewId === local.INFORMATION && (
        <InformationOverview
          threadDetail={threadDetail}
          isLoading={isLoading}
        />
      )} */}
    </GS.OuterContainer>
  )
}

export default EmailDetail
