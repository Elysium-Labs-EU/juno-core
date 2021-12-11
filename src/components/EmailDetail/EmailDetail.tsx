import React, { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {
  selectCurrentEmail,
  selectIsReplying,
  selectViewIndex,
  setCurrentEmail,
  setCurrentMessage,
  setIsReplying,
  setViewIndex,
} from '../../Store/emailDetailSlice'
import {
  selectIsLoading,
  selectServiceUnavailable,
  setServiceUnavailable,
} from '../../Store/utilsSlice'
import { selectLabelIds, setCurrentLabels } from '../../Store/labelsSlice'
import { selectEmailList, selectIsFocused, selectIsSorting } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import * as GS from '../../styles/globalStyles'
import * as S from './EmailDetailStyles'
import FilesOverview from './Files/FilesOverview'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { EmailListThreadItem } from '../../Store/emailListTypes'
import { LocationObjectType } from '../types/globalTypes'
import EmailDetailHeader from './EmailDetailHeader'
import PreLoadMessages from './Messages/PreLoadMessages/PreLoadMessages'
import MessagesOverview from './Messages/MessagesOverview'
// import InformationOverview from './Information/InformationOverview'

const EmailDetail = () => {
  const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const isReplying = useAppSelector(selectIsReplying)
  const viewIndex = useAppSelector(selectViewIndex)
  const isSorting = useAppSelector(selectIsSorting)
  const isFocused = useAppSelector(selectIsFocused)
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()
  const { messageId, overviewId } = useParams<{ messageId: string; overviewId: string }>()
  const [threadDetailList, setThreadDetailList] = useState<EmailListThreadItem[]>([])
  const localLabels = useRef<string[] | string>([])
  const activePageTokenRef = useRef('')

  const isReplyingListener = ({ messageIndex }: { messageIndex: number }) => {
    if (messageIndex > -1) {
      dispatch(setIsReplying(true))
    }
    if (messageIndex === undefined) {
      dispatch(setIsReplying(false))
    }
    const activeThreadListMessages = threadDetailList[threadDetailList.findIndex((item) => item.id === messageId)].messages
    if (activeThreadListMessages) {
      dispatch(setCurrentMessage(activeThreadListMessages[(activeThreadListMessages.length - 1) - messageIndex]))
    }
  }

  const fetchEmailDetails = () => {
    if (labelIds) {
      const activeList =
        emailList && emailList.findIndex((list) => list.labels.includes(labelIds[0]))
      const currentActivePageToken = emailList[activeList].nextPageToken
      if (activeList > -1 && activePageTokenRef.current !== currentActivePageToken) {
        activePageTokenRef.current = currentActivePageToken
        setThreadDetailList(emailList[activeList].threads)
      }
      if (serviceUnavailable && serviceUnavailable.length > 0) {
        dispatch(setServiceUnavailable(''))
      }
    } else {
      dispatch(setServiceUnavailable(local.ERROR_EMAIL))
    }
  }


  // Need to update the threadDetailList whenever an email is archived or removed.
  useEffect(() => {
    if (threadDetailList.length > 0 && emailList) {
      const activeList =
        emailList && emailList.findIndex((list) => list.labels.includes(labelIds[0]))
      if (emailList[activeList].threads.length !== threadDetailList.length) {
        setThreadDetailList(emailList[activeList].threads)
      }
    }
  }, [emailList, threadDetailList])

  useEffect(() => {
    if (labelIds && labelIds === localLabels.current) {
      emailList.length > 0 && fetchEmailDetails()
    } else {
      const newLabelIds = [location.pathname.split('/')[2]]
      dispatch(setCurrentLabels(newLabelIds))
      localLabels.current = newLabelIds
      emailList.length > 0 && fetchEmailDetails()
    }
  }, [labelIds, emailList])
  // DetailNavigation will refetch metaList + emailList if empty.

  useEffect(() => {
    if (messageId !== undefined && currentEmail !== messageId) {
      dispatch(setCurrentEmail(messageId))
    }
  }, [messageId])

  useEffect(() => {
    if (currentEmail !== messageId && isReplying) {
      dispatch(setIsReplying(false))
    }
  }, [messageId])

  useEffect(() => {
    if (viewIndex === -1) {
      if (threadDetailList && threadDetailList.length > 0) {
        dispatch(setViewIndex(threadDetailList.findIndex((item) => item.id === currentEmail)))
      }
    }
  }, [viewIndex, threadDetailList])


  return (
    <>
      <EmailDetailHeader />
      <S.Scroll clientState={isSorting || isFocused}>
        <GS.OuterContainer isReplying={isReplying}>
          {overviewId &&
            overviewId.length > 0 &&
            overviewId === local.MESSAGES &&
            threadDetailList.length > 0 && (
              viewIndex > -1 && (
                <MessagesOverview
                  threadDetail={threadDetailList[viewIndex]}
                  isLoading={isLoading}
                  isReplying={isReplying}
                  isReplyingListener={isReplyingListener}
                  labelIds={labelIds}
                />)
            )}
          {overviewId &&
            overviewId.length &&
            overviewId === local.MESSAGES &&
            threadDetailList.length > 0 && viewIndex > -1 && (
              <S.HiddenMessagesFeed>
                <PreLoadMessages
                  threadDetailList={threadDetailList}
                  viewIndex={viewIndex}
                />
              </S.HiddenMessagesFeed>
            )}
          {overviewId === local.FILES && threadDetailList.length > 0 && (
            <FilesOverview threadDetail={threadDetailList[viewIndex]} isLoading={isLoading} />
          )}
          {/* {overviewId === local.INFORMATION && (
        <InformationOverview
          threadDetail={threadDetail}
          isLoading={isLoading}
        />
      )} */}
        </GS.OuterContainer>
      </S.Scroll>
    </>
  )
}

export default EmailDetail
