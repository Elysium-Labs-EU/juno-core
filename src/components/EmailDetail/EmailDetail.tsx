import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { push } from 'redux-first-history'

import * as local from 'constants/emailDetailConstants'
import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import useFetchDraftList from 'hooks/useFetchDraftList'
import useFetchEmailDetail from 'hooks/useFetchEmailDetail'
import {
  selectCoreStatus,
  selectCurrentEmail,
  selectIsForwarding,
  selectIsReplying,
  selectViewIndex,
  setCurrentEmail,
  setIsForwarding,
  setIsReplying,
  setViewIndex,
} from 'store/emailDetailSlice'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSearchList,
  selectSelectedEmails,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectStorageLabels } from 'store/labelsSlice'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import {
  selectIsFlexibleFlowActive,
  selectIsLoading,
  selectIsProcessing,
} from 'store/utilsSlice'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'
import filterTrashMessages from 'utils/filterTrashMessages'
import { findLabelByName } from 'utils/findLabel'

import EmailDetailHeader from './EmailDetailHeader'
import * as S from './EmailDetailStyles'
import FilesOverview from './Files/FilesOverview'
// import PreLoadMessages from './Messages/PreLoadMessages/PreLoadMessages'
import MessagesOverview from './Messages/MessagesOverview'
import Baseloader from '../BaseLoader/BaseLoader'

/**
 * @component EmailDetail - the main component to handle the content of the email detail page. It handles the email detail header, the mapped messages, the preloading of messages, the files and messages tabs, and the side composing mode.
 * @returns Either a email detail view or a base loader.
 */

const EmailDetail = () => {
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const coreStatus = useAppSelector(selectCoreStatus)
  const currentEmail = useAppSelector(selectCurrentEmail)
  const emailList = useAppSelector(selectEmailList)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const isForwarding = useAppSelector(selectIsForwarding)
  const isLoading = useAppSelector(selectIsLoading)
  const isProcessing = useAppSelector(selectIsProcessing)
  const isReplying = useAppSelector(selectIsReplying)
  const labelIds = useAppSelector(selectLabelIds)
  const searchList = useAppSelector(selectSearchList)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const storageLabels = useAppSelector(selectStorageLabels)
  const viewIndex = useAppSelector(selectViewIndex)
  const dispatch = useAppDispatch()
  const [baseState, setBaseState] = useState(local.STATUS_STATUS_MAP.idle)
  const [currentLocal, setCurrentLocal] = useState<string>('')
  const [shouldRefreshDetail, setShouldRefreshDetail] = useState(false)
  const isComposerActiveRef = useRef(false)
  const { threadId, overviewId } = useParams<{
    threadId: string
    overviewId: string
  }>()
  const location = useLocation()
  const [activeEmailList, setActiveEmailList] = useState<TEmailListObject>()

  useFetchEmailDetail({
    threadId,
    activeEmailList,
    forceRefresh: shouldRefreshDetail,
    setShouldRefreshDetail,
  })
  useFetchDraftList({
    shouldFetchDrafts: !!activeEmailList?.threads.some((thread) =>
      thread.messages.some((message) =>
        message?.labelIds?.includes(global.DRAFT_LABEL)
      )
    ),
  })

  // On closing of the composer refresh the message feed
  useEffect(() => {
    if ((isForwarding || isReplying) && !isComposerActiveRef.current) {
      isComposerActiveRef.current = true
    } else if (isComposerActiveRef.current && !isProcessing) {
      isComposerActiveRef.current = false
      setShouldRefreshDetail(true)
    }
  }, [isForwarding, isReplying, isProcessing])

  // This will set the activeEmailList when first opening the email - and whenever the newly focused email detail is updating the emaillist.
  // It will also update the activeEmailList whenever an email is archived or removed, triggered by the change in emailList or searchList.
  useEffect(() => {
    setBaseState(local.STATUS_STATUS_MAP.loaded)
    if (coreStatus === global.CORE_STATUS_MAP.searching && searchList) {
      setActiveEmailList(searchList)
    } else {
      const targetEmailList = emailList[activeEmailListIndex]
      if (targetEmailList) {
        if (
          (coreStatus === global.CORE_STATUS_MAP.focused ||
            (isFlexibleFlowActive &&
              coreStatus === global.CORE_STATUS_MAP.sorting)) &&
          selectedEmails &&
          selectedEmails.selectedIds.length > 0 &&
          (selectedEmails.labelIds.includes(
            findLabelByName({
              storageLabels,
              LABEL_NAME: global.TODO_LABEL_NAME,
            })?.id ?? ''
          ) ||
            selectedEmails.labelIds.includes(global.INBOX_LABEL))
        ) {
          const relevantThreadsFeed = targetEmailList.threads.filter((t) =>
            selectedEmails.selectedIds.includes(t.id)
          )
          setActiveEmailList({
            ...targetEmailList,
            threads: relevantThreadsFeed,
          })
        } else {
          setActiveEmailList(targetEmailList)
        }
      }
    }
  }, [emailList, activeEmailListIndex, searchList])

  // If the current email is found, set the id to the store. Otherwise reroute user to ToDo page.
  useEffect(() => {
    if (
      currentEmail !== currentLocal &&
      baseState === local.STATUS_STATUS_MAP.loaded
    ) {
      if (activeEmailList) {
        setCurrentLocal(currentEmail)
      } else {
        dispatch(push(RoutesConstants.TODO))
      }
    }
  }, [currentEmail, activeEmailList, baseState])

  // If the found threadId doesn't match with the Redux version - it will set it.
  // TODO: Convert to listener in Redux
  useEffect(() => {
    if (threadId && !currentEmail) {
      dispatch(setCurrentEmail(threadId))
    }
  }, [threadId, currentEmail])

  // Based on the location, set the correct Redux state. Location state comes from openEmail function
  useEffect(() => {
    if (isReplying && !location?.state?.isReplying) {
      dispatch(setIsReplying(false))
    }
    if (isForwarding && !location?.state?.isForwarding) {
      dispatch(setIsForwarding(false))
    }
  }, [location])

  // If there is no viewIndex yet - set it by finding the index of the email.
  useEffect(() => {
    if (
      viewIndex === -1 &&
      activeEmailList &&
      activeEmailList.threads.length > 0
    ) {
      dispatch(
        setViewIndex(
          activeEmailList.threads.findIndex((item) => item.id === currentEmail)
        )
      )
    }
  }, [viewIndex, activeEmailList, currentEmail])

  return activeEmailList ? (
    <>
      <EmailDetailHeader activeEmailList={activeEmailList} />
      <AnimatedMountUnmount>
        <S.Scroll clientState={Boolean(coreStatus)}>
          <S.EmailDetailWrapper tabbedView={isReplying || isForwarding}>
            {overviewId === local.MESSAGES &&
              activeEmailList.threads.length > 0 &&
              viewIndex > -1 && (
                <>
                  <MessagesOverview
                    isForwarding={isForwarding}
                    isLoading={isLoading}
                    isReplying={isReplying}
                    labelIds={labelIds}
                    setShouldRefreshDetail={setShouldRefreshDetail}
                    threadDetail={filterTrashMessages(
                      activeEmailList.threads[viewIndex],
                      labelIds
                    )}
                  />
                  {/* <S.HiddenMessagesFeed test-dataid="email-hidden-message-feed">
                    <PreLoadMessages
                      threadDetailList={activeEmailList.threads}
                      viewIndex={viewIndex}
                    />
                  </S.HiddenMessagesFeed> */}
                </>
              )}
            {overviewId === local.FILES &&
              activeEmailList.threads.length > 0 && (
                <FilesOverview
                  isLoading={isLoading}
                  threadDetail={filterTrashMessages(
                    activeEmailList.threads[viewIndex],
                    labelIds
                  )}
                />
              )}
          </S.EmailDetailWrapper>
        </S.Scroll>
      </AnimatedMountUnmount>
    </>
  ) : (
    <Baseloader />
  )
}

export default EmailDetail
