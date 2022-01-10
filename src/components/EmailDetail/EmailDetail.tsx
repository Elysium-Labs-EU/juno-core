import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  selectIsSilentLoading,
  selectServiceUnavailable,
  setServiceUnavailable,
} from '../../Store/utilsSlice'
import { selectLabelIds, setCurrentLabels } from '../../Store/labelsSlice'
import { loadEmails, selectEmailList, selectIsFocused, selectIsSorting, storeSearchResults } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
import * as global from '../../constants/globalConstants'
import * as draft from '../../constants/draftConstants'
import * as GS from '../../styles/globalStyles'
import * as S from './EmailDetailStyles'
import FilesOverview from './Files/FilesOverview'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { EmailListObject } from '../../Store/emailListTypes'
import { LocationObjectType } from '../types/globalTypes'
import EmailDetailHeader from './EmailDetailHeader'
import PreLoadMessages from './Messages/PreLoadMessages/PreLoadMessages'
import MessagesOverview from './Messages/MessagesOverview'
import { resetComposeEmail, selectComposeEmail } from '../../Store/composeSlice'
import { loadDraftList, resetDraftDetails, selectDraftListLoaded } from '../../Store/draftsSlice'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Baseloader from '../BaseLoader/BaseLoader'
import threadApi from '../../data/threadApi'

const EmailDetail = () => {
  const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const draftListLoaded = useAppSelector(selectDraftListLoaded)
  const isReplying = useAppSelector(selectIsReplying)
  const viewIndex = useAppSelector(selectViewIndex)
  const isSorting = useAppSelector(selectIsSorting)
  const isFocused = useAppSelector(selectIsFocused)
  const composeEmail = useAppSelector(selectComposeEmail)
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()
  const [currLocal, setCurrLocal] = useState<string>('')
  const { messageId, overviewId } = useParams<{ messageId: string; overviewId: string }>()
  const [activeEmailList, setActiveEmailList] = useState<EmailListObject>()
  const localLabels = useRef<string[] | string>([])
  const activePageTokenRef = useRef('')
  const activeEmailListThreadsLengthRef = useRef<number>(-1)

  const cleanUpComposerAndDraft = () => {
    dispatch(resetComposeEmail())
    dispatch(resetDraftDetails())
  }

  const isReplyingListener = ({ messageIndex }: { messageIndex: number }) => {
    if (messageIndex > -1) {
      Object.keys(composeEmail).length > 0 && cleanUpComposerAndDraft()
      dispatch(setIsReplying(true))
    }
    if (messageIndex === undefined) {
      Object.keys(composeEmail).length > 0 && cleanUpComposerAndDraft()
      dispatch(setIsReplying(false))
    }
    if (activeEmailList && activeEmailList.threads.length > 0) {
      dispatch(setCurrentMessage(activeEmailList.threads[(activeEmailList.threads.length - 1) - messageIndex]))
    }
  }

  const emailListIndex = useMemo(
    () => emailList.findIndex((threadList) => threadList.labels && threadList.labels.includes(labelIds[0])),
    [emailList, labelIds]
  )

  const fetchEmailList = async () => {
    if (!labelIds.includes(global.ARCHIVE_LABEL)) {
      const params = {
        labelIds,
        maxResults: 20,
      }
      dispatch(loadEmails(params))
    }
    if (location.pathname.includes(draft.LABEL) && !draftListLoaded) {
      dispatch(loadDraftList())
    }
    if (labelIds.includes(global.ARCHIVE_LABEL) && currentEmail) {
      // If the requested thread is Archive, fetch the individual thread and save it.
      const response = await threadApi().getThreadDetail(currentEmail)
      if (response) {
        const emailListObject = {
          labels: undefined,
          threads: [response.thread],
          nextPageToken: null
        }
        dispatch(storeSearchResults(emailListObject))
      }
    }
  }

  const fetchEmailDetails = () => {
    if (labelIds) {
      const currentActivePageToken = emailList[emailListIndex].nextPageToken
      if (emailListIndex > -1 && activePageTokenRef.current !== currentActivePageToken) {
        activePageTokenRef.current = currentActivePageToken
        setActiveEmailList(emailList[emailListIndex])
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
    if (activeEmailList && activeEmailList.threads.length > 0 && emailList) {
      if (emailList[emailListIndex] && emailList[emailListIndex].threads.length !== activeEmailList.threads.length) {
        setActiveEmailList(emailList[emailListIndex])
      }
    }
  }, [emailList, activeEmailList])

  useEffect(() => {
    if (currentEmail !== currLocal) {
      if (emailList.length > 0 && emailList[emailListIndex] && emailList[emailListIndex].threads.length > 0) {
        setCurrLocal(currentEmail)
        return
      }
      fetchEmailList()
    }
  }, [currentEmail, emailList])

  // If after loading the emails the viewIndex is still -1, attempt a different load method
  useEffect(() => {
    if (!isLoading && viewIndex === -1 && currLocal && !labelIds.includes(global.ARCHIVE_LABEL)) {
      const loadSpecificEmail = async () => {
        const response = await threadApi().getThreadDetail(currLocal)
        if (response) {
          const emailListObject = {
            labels: labelIds,
            threads: [response.thread],
            nextPageToken: null
          }
          dispatch(storeSearchResults(emailListObject))
        }
      }
      loadSpecificEmail()
    }
  }, [isLoading, viewIndex, currLocal])

  // DetailNavigation will refetch emailList if empty.
  useEffect(() => {
    if (labelIds && labelIds === localLabels.current) {
      if (emailList.length > 0 && emailList[emailListIndex]) fetchEmailDetails()
    } else {
      const newLabelIds = [location.pathname.split('/')[2]]
      dispatch(setCurrentLabels(newLabelIds))
      localLabels.current = newLabelIds
      if (emailList.length > 0 && emailList[emailListIndex]) fetchEmailDetails()
    }
  }, [labelIds, emailList])

  useEffect(() => {
    if (messageId && currentEmail !== messageId) {
      dispatch(setCurrentEmail(messageId))
    }
  }, [messageId])

  useEffect(() => {
    if (currentEmail !== messageId && isReplying) {
      dispatch(setIsReplying(false))
    }
  }, [messageId])


  // If there is no viewIndex set it by finding the index of the email.
  useEffect(() => {
    if (viewIndex === -1 && !isLoading) {
      if (activeEmailList && activeEmailList.threads.length > 0) {
        dispatch(setViewIndex(activeEmailList.threads.findIndex((item) => item.id === currentEmail)))
        activeEmailListThreadsLengthRef.current = activeEmailList.threads.length
      }
    }
  }, [viewIndex, activeEmailList, currentEmail, isLoading])

  // If there is a viewIndex and the emailList happends to be expanding by silentLoad - recalculate the viewIndex.
  useEffect(() => {
    if (viewIndex > -1 && !isSilentLoading) {
      if (activeEmailList && activeEmailList.threads.length > 0 && activeEmailListThreadsLengthRef.current < activeEmailList.threads.length) {
        activeEmailListThreadsLengthRef.current = activeEmailList.threads.length
        dispatch(setViewIndex(activeEmailList.threads.findIndex((item) => item.id === currentEmail)))
      }
    }
  }, [viewIndex, activeEmailList, currentEmail, isSilentLoading])

  return (
    activeEmailList ?
      <>
        <EmailDetailHeader activeEmailList={activeEmailList} />
        <AnimatedMountUnmount>
          <S.Scroll clientState={isSorting || isFocused}>
            <GS.OuterContainer isReplying={isReplying}>
              {overviewId === local.MESSAGES &&
                activeEmailList.threads.length > 0 &&
                viewIndex > -1 && (
                  <>
                    <MessagesOverview
                      threadDetail={activeEmailList.threads[viewIndex]}
                      isLoading={isLoading}
                      isReplying={isReplying}
                      isReplyingListener={isReplyingListener}
                      labelIds={labelIds}
                    />
                    <S.HiddenMessagesFeed>
                      <PreLoadMessages
                        threadDetailList={activeEmailList.threads}
                        viewIndex={viewIndex}
                      />
                    </S.HiddenMessagesFeed>
                  </>)
              }
              {overviewId === local.FILES && activeEmailList.threads.length > 0 && (
                <FilesOverview threadDetail={activeEmailList.threads[viewIndex]} isLoading={isLoading} />
              )}
            </GS.OuterContainer>
          </S.Scroll>
        </AnimatedMountUnmount>
      </> : <Baseloader />
  )
}

export default EmailDetail
