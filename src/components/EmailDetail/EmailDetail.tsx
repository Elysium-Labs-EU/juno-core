import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {
  selectCurrentEmail,
  selectIsReplying,
  selectViewIndex,
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
import * as S from './EmailDetailStyles'
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
  // const [threadDetail, setThreadDetail] = useState<EmailListThreadItem>()
  const [threadDetailList, setThreadDetailList] = useState<EmailListThreadItem[]>()
  const localLabels = useRef<string[] | string>([])
  const viewIndex = useAppSelector(selectViewIndex)

  const isReplyingListener = () => {
    dispatch(setIsReplying(!isReplying))
  }

  const fetchEmailDetails = () => {
    if (labelIds && threadId) {
      const activeList =
        emailList &&
        emailList.findIndex((list) => list.labels.includes(labelIds[0]))
      setThreadDetailList(emailList[activeList].threads)
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
        emailList.length > 0 && fetchEmailDetails()
        // emailList.length > 0 && fetchEmailDetail({ threadId, labelIds })
      } else {
        const newLabelIds = [location.pathname.split('/')[2]]
        dispatch(setCurrentLabels(newLabelIds))
        localLabels.current = newLabelIds
        emailList.length > 0 && fetchEmailDetails()
        // emailList.length > 0 && fetchEmailDetail({ threadId, newLabelIds })
      }
    }
  }, [labelIds, emailList, threadId])
  // DetailNavigation will refetch metaList + emailList if empty.

  // useEffect(() => {
  //   if (threadDetailList && threadDetailList.length > 0 && viewIndex > -1) {
  //     setThreadDetail(threadDetailList[viewIndex])
  //   }
  // }, [threadDetailList, viewIndex])

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

  // TODO: Replace viewIndex with local value to speed up process
  const MessagesFeed = () => {
    if (overviewId === local.MESSAGES && threadDetailList && viewIndex > -1) {
      return (
        <>
          {threadDetailList.length > 0 && threadDetailList.map((item, index) =>
            <S.MessageFeedViewContainer key={item.id} show={index === viewIndex}>
              <MessagesOverview
                threadDetail={item}
                isLoading={isLoading}
                isReplying={isReplying}
                isReplyingListener={isReplyingListener}
              />
            </S.MessageFeedViewContainer>
          )}
        </>
      )
    }
    return "Cannot load details"
  }

  return (
    <GS.OuterContainer isReplying={isReplying}>
      {overviewId === local.MESSAGES && threadDetailList && viewIndex > -1 && (
        MessagesFeed()
      )}
      {overviewId === local.FILES && threadDetailList && viewIndex > -1 && (
        <FilesOverview threadDetail={threadDetailList[viewIndex]} isLoading={isLoading} />
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
