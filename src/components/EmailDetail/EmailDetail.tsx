import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {
  selectCurrentEmail,
  selectIsReplying,
  // selectViewIndex,
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
import Emaildetailheader from './EmailDetailHeader'
import loadNextPage from '../../utils/loadNextPage'
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
  const [threadDetailList, setThreadDetailList] = useState<EmailListThreadItem[]>()
  const localLabels = useRef<string[] | string>([])
  const [viewIndexState, setViewIndexState] = useState(-1)

  // console.log(currentEmail)

  useEffect(() => {
    if (viewIndexState === -1) {
      if (threadDetailList && threadDetailList.length > 0) {
        setViewIndexState(threadDetailList.findIndex((item) => item.id === currentEmail))
      }
    }
  }, [viewIndexState, threadDetailList])

  const currentViewListener = (number: number) => {
    setViewIndexState((prevState) => prevState + number)
  }

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

  useEffect(() => {
    // console.log('emailList', emailList)
    // if (currentEmail && threadDetailList && threadDetailList.length > 0) {
    //   const {} = threadDetailList
    //   loadNextPage({nex})
    // }
  }, [currentEmail, threadDetailList, emailList])


  const MessagesFeed = () => {
    if (overviewId === local.MESSAGES && threadDetailList && viewIndexState > -1) {
      return (
        <>
          {threadDetailList.length > 0 && threadDetailList.map((item, index) =>
            <S.MessageFeedViewContainer key={item.id} show={index === viewIndexState}>
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
    <>
      <Emaildetailheader currentViewListener={currentViewListener} viewIndexState={viewIndexState} />
      <GS.OuterContainer isReplying={isReplying}>
        {overviewId === local.MESSAGES && threadDetailList && viewIndexState > -1 && (
          MessagesFeed()
        )}
        {overviewId === local.FILES && threadDetailList && viewIndexState > -1 && (
          <FilesOverview threadDetail={threadDetailList[viewIndexState]} isLoading={isLoading} />
        )}
        {/* {overviewId === local.INFORMATION && (
        <InformationOverview
          threadDetail={threadDetail}
          isLoading={isLoading}
        />
      )} */}
      </GS.OuterContainer>
    </>
  )
}

export default EmailDetail
