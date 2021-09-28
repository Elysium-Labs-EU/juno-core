import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
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
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import {
  EmailListThreadItem
} from '../../Store/emailListTypes'
import { LocationObjectType } from '../types/globalTypes'
// import InformationOverview from './Information/InformationOverview'


const EmailDetail = () => {
  const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const isReplying = useAppSelector(selectIsReplying)
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()
  const { threadId, overviewId } = useParams<{ threadId: string, overviewId: string }>()
  const [threadDetail, setThreadDetail] = useState<EmailListThreadItem>()
  const localLabels = useRef<string[] | string>([])

  const isReplyingListener = () => {
    dispatch(setIsReplying(!isReplying))
  }

  const fetchEmailDetail = () => {
    if (labelIds && threadId) {
      const activeList =
        emailList &&
        emailList.findIndex((list) => list.labels.includes(labelIds[0]))
      const activeEmail =
        emailList &&
        emailList[activeList].threads.findIndex((item) => item.id === threadId)
      setThreadDetail(emailList[activeList].threads[activeEmail])
      if (serviceUnavailable && serviceUnavailable.length > 0) {
        dispatch(setServiceUnavailable(''))
      }
    } else {
      dispatch(setServiceUnavailable(local.ERROR_EMAIL))
    }
  }

  useEffect(() => {
    if (threadId) {
      if (labelIds && labelIds === localLabels.current) {
        emailList.length > 0 && fetchEmailDetail()
        // emailList.length > 0 && fetchEmailDetail({ threadId, labelIds })
      } else {
        const newLabelIds = [location.pathname.split('/')[2]]
        dispatch(setCurrentLabels(newLabelIds))
        localLabels.current = newLabelIds
        emailList.length > 0 && fetchEmailDetail()
        // emailList.length > 0 && fetchEmailDetail({ threadId, newLabelIds })
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
    if (currentEmail !== threadId && isReplying) {
      dispatch(setIsReplying(false))
    }
  }, [threadId])

  return (
    <GS.OuterContainer isReplying={isReplying}>
      {overviewId === local.MESSAGES && threadDetail && (
        <MessagesOverview
          threadDetail={threadDetail}
          isLoading={isLoading}
          isReplying={isReplying}
          isReplyingListener={isReplyingListener}
        />
      )}
      {overviewId === local.FILES && threadDetail && (
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
