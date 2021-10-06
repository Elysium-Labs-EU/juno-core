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
import FilesOverview from './Files/FilesOverview'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { EmailListThreadItem } from '../../Store/emailListTypes'
import { LocationObjectType } from '../types/globalTypes'
import Emaildetailheader from './EmailDetailHeader'
import loadNextPage from '../../utils/loadNextPage'
import PreLoadMessages from './Messages/PreLoadMessages/PreLoadMessages'
import MessagesOverview from './Messages/MessagesOverview'
// import InformationOverview from './Information/InformationOverview'

const isReplyingListener = ({ dispatch, isReplying }: { dispatch: any; isReplying: boolean }) => {
  dispatch(setIsReplying(!isReplying))
}

const EmailDetail = () => {
  const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const isReplying = useAppSelector(selectIsReplying)
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()
  const { threadId, overviewId } = useParams<{ threadId: string; overviewId: string }>()
  const [threadDetailList, setThreadDetailList] = useState<EmailListThreadItem[]>([])
  const localLabels = useRef<string[] | string>([])
  const [viewIndexState, setViewIndexState] = useState(-1)
  const activePageTokenRef = useRef('')

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

  useEffect(() => {
    if (labelIds && labelIds === localLabels.current && emailList.length > 0) {
      fetchEmailDetails()
    } else {
      const newLabelIds = [location.pathname.split('/')[2]]
      dispatch(setCurrentLabels(newLabelIds))
      localLabels.current = newLabelIds
      emailList.length > 0 && fetchEmailDetails()
    }
  }, [labelIds, emailList])
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

  // useEffect(() => {
  //   // console.log('emailList', emailList)
  //   // if (currentEmail && threadDetailList && threadDetailList.length > 0) {
  //   //   const {} = threadDetailList
  //   //   loadNextPage({nex})
  //   // }
  // }, [currentEmail, threadDetailList, emailList])

  return (
    <>
      <Emaildetailheader
        currentViewListener={currentViewListener}
        viewIndexState={viewIndexState}
      />
      <GS.OuterContainer isReplying={isReplying}>
        {overviewId &&
          overviewId.length &&
          overviewId === local.MESSAGES &&
          threadDetailList.length > 0 && (
            <MessagesOverview
              threadDetail={threadDetailList[viewIndexState]}
              isLoading={isLoading}
              isReplying={isReplying}
              isReplyingListener={isReplyingListener}
            />
          )}
        {overviewId &&
          overviewId.length &&
          overviewId === local.MESSAGES &&
          threadDetailList.length > 0 && viewIndexState > -1 && (
            <S.HiddenMessagesFeed>
              <PreLoadMessages
                threadDetailList={threadDetailList}
                viewIndexState={viewIndexState}
              />
            </S.HiddenMessagesFeed>
          )}
        {overviewId === local.FILES && threadDetailList.length > 0 && (
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
