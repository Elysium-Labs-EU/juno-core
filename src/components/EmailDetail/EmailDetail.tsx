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
  selectServiceUnavailable,
  setServiceUnavailable,
} from '../../Store/utilsSlice'
import { selectLabelIds, setCurrentLabels } from '../../Store/labelsSlice'
import { loadEmails, selectEmailList, selectIsFocused, selectIsSorting } from '../../Store/emailListSlice'
import * as local from '../../constants/emailDetailConstants'
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

const EmailDetail = () => {
  const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
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
    () => emailList.findIndex((threadList) => threadList.labels.includes(labelIds[0])),
    [emailList, labelIds]
  )

  const fetchEmailList = () => {
    const labels = labelIds
    const params = {
      labelIds: labels,
      maxResults: 20,
    }
    dispatch(loadEmails(params))
    if (location.pathname.includes(draft.LABEL) && !draftListLoaded) {
      dispatch(loadDraftList())
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
      if (emailList[emailListIndex].threads.length !== activeEmailList.threads.length) {
        setActiveEmailList(emailList[emailListIndex])
      }
    }
  }, [emailList, activeEmailList])

  useEffect(() => {
    if (currentEmail !== currLocal) {
      if (emailList.length > 0) {
        setCurrLocal(currentEmail)
        return
      }
      fetchEmailList()
    }
  }, [currentEmail, emailList])

  // DetailNavigation will refetch emailList if empty.
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
      if (activeEmailList && activeEmailList.threads.length > 0) {
        dispatch(setViewIndex(activeEmailList.threads.findIndex((item) => item.id === currentEmail)))
      }
    }
  }, [viewIndex, activeEmailList])


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
