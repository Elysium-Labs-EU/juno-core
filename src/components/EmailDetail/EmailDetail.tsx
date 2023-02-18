import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { push } from 'redux-first-history'

import BackButton from 'components/Elements/Buttons/BackButton'
import CustomButton from 'components/Elements/Buttons/CustomButton'
import Layout from 'components/Layout/Layout'
import * as local from 'constants/emailDetailConstants'
import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import useFetchDraftList from 'hooks/useFetchDraftList'
import useFetchEmailDetail from 'hooks/useFetchEmailDetail'
import { QiSearch } from 'images/svgIcons/quillIcons'
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
  setInSearch,
} from 'store/utilsSlice'
import filterTrashMessages from 'utils/filterTrashMessages'
import { findLabelByName } from 'utils/findLabel'

import DetailNavigationContainer from './DetailNavigation/DetailNavigationContainer'
import * as S from './EmailDetailStyles'
import EmailPosition from './EmailPosition/EmailPosition'
import FilesOverview from './Files/FilesOverview'
// import PreLoadMessages from './Messages/PreLoadMessages/PreLoadMessages'
import EmailDetailOptions from './Messages/EmailDetailOptions'
import ForwardingComposer from './Messages/InlineComposers/ForwardingComposer'
import ReplyComposer from './Messages/InlineComposers/ReplyComposer'
import MessagesOverview from './Messages/MessagesOverview'
import Tabs from './Tabs/Tabs'
import getEmailHeader from './Utils/getEmailHeader'
import useEdgeLoadNextPage from './Utils/useEdgeLoadNextPage'
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
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  )
  const [shouldRefreshDetail, setShouldRefreshDetail] = useState(false)
  const [unsubscribeLink, setUnsubscribeLink] = useState<string | null>(null)
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
  useEdgeLoadNextPage({ activeEmailList })

  // On closing of the composer refresh the message feed
  useEffect(() => {
    isComposerActiveRef.current = isForwarding || isReplying
    if (!isProcessing && !isComposerActiveRef.current) {
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

  const showNoNavigation =
    coreStatus === global.CORE_STATUS_MAP.focused ||
    coreStatus === global.CORE_STATUS_MAP.sorting

  const noThrashMessages = useMemo(() => {
    if (activeEmailList) {
      return filterTrashMessages(activeEmailList.threads[viewIndex], labelIds)
    }
    return undefined
  }, [activeEmailList, labelIds, viewIndex])

  // A callback function that will listen to the discard or cancel event on the composer
  const messageOverviewListener = useCallback(
    (eventType: 'cancel' | 'discard') => {
      // TODO: Discard eventType is currently unused.
      if (eventType === 'cancel') {
        setSelectedIndex(undefined)
      }
    },
    []
  )

  return activeEmailList ? (
    <Layout
      headerTitle={getEmailHeader({
        coreStatus,
        labelIds,
        location,
        storageLabels,
      })}
      activePage={undefined}
      showNavigation={!showNoNavigation}
      additionalHeader={
        coreStatus === global.CORE_STATUS_MAP.searching ? (
          <S.SearchQuery>
            {labelIds.includes(global.SEARCH_LABEL) && (
              <CustomButton
                label={`Search Query: "${searchList?.q}"`}
                onClick={() => dispatch(setInSearch(true))}
                suppressed
                title="Go back to search window"
                icon={<QiSearch />}
              />
            )}
          </S.SearchQuery>
        ) : undefined
      }
    >
      <S.Scroll tabbedView={isForwarding || isReplying}>
        <S.EmailDetailWrapper>
          <S.BackButtonContainer>
            <S.StickyOptions>
              <BackButton />
            </S.StickyOptions>
          </S.BackButtonContainer>
          <S.EmailWithComposerContainer>
            <S.EmailCenterContainer>
              <S.EmailTopControlContainer
                tabbedView={isForwarding || isReplying}
              >
                <Tabs activeEmailList={activeEmailList} />
                {showNoNavigation ? (
                  <EmailPosition />
                ) : (
                  <DetailNavigationContainer
                    activeEmailList={activeEmailList}
                  />
                )}
              </S.EmailTopControlContainer>
              {/* TODO: Create match pattern here */}
              {overviewId === local.MESSAGES &&
                noThrashMessages &&
                viewIndex > -1 && (
                  <MessagesOverview
                    threadDetail={noThrashMessages}
                    isLoading={isLoading}
                    isReplying={isReplying}
                    isForwarding={isForwarding}
                    labelIds={labelIds}
                    setShouldRefreshDetail={setShouldRefreshDetail}
                    setUnsubscribeLink={setUnsubscribeLink}
                  />
                )}
              {overviewId === local.FILES && noThrashMessages && (
                <FilesOverview
                  threadDetail={noThrashMessages}
                  isLoading={isLoading}
                />
              )}
            </S.EmailCenterContainer>
            {isReplying && noThrashMessages && noThrashMessages?.messages && (
              <ReplyComposer
                localThreadDetail={noThrashMessages}
                selectedIndex={selectedIndex}
                messageOverviewListener={messageOverviewListener}
              />
            )}
            {isForwarding && noThrashMessages && noThrashMessages?.messages && (
              <ForwardingComposer
                localThreadDetail={noThrashMessages}
                selectedIndex={selectedIndex}
                messageOverviewListener={messageOverviewListener}
                isForwarding={isForwarding}
              />
            )}
          </S.EmailWithComposerContainer>
          {noThrashMessages?.messages &&
            noThrashMessages.messages.length &&
            !isReplying &&
            !isForwarding && (
              <EmailDetailOptions
                threadDetail={noThrashMessages}
                unsubscribeLink={unsubscribeLink}
              />
            )}
        </S.EmailDetailWrapper>
      </S.Scroll>
    </Layout>
  ) : (
    <Baseloader />
  )
}

export default EmailDetail
