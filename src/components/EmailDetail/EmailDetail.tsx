import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import Stack from 'components/Elements/Stack/Stack'
import Layout from 'components/Layout/Layout'
import useFetchDraftList from 'hooks/useFetchDraftList'
import useFetchEmailDetail from 'hooks/useFetchEmailDetail'
import { QiSearch } from 'images/svgIcons/quillIcons'
import {
  selectCoreStatus,
  selectCurrentEmail,
  selectIsForwarding,
  selectIsReplying,
  selectViewIndex,
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
  selectIsProcessing,
  setInSearch,
} from 'store/utilsSlice'
import filterTrashMessages from 'utils/filterTrashMessages'
import { findLabelByName } from 'utils/findLabel'

// import PreLoadMessages from './Messages/PreLoadMessages/PreLoadMessages'
import RenderEmailDetail from './Messages/RenderEmailDetail'
import getEmailHeader from './Utils/getEmailHeader'
import useEdgeLoadNextPage from './Utils/useEdgeLoadNextPage'
import Baseloader from '../BaseLoader/BaseLoader'
import { CORE_STATUS_MAP, DRAFT_LABEL, INBOX_LABEL, SEARCH_LABEL, TODO_LABEL_NAME } from 'constants/globalConstants'

const SearchButtonInHeader = () => {
  const labelIds = useAppSelector(selectLabelIds)
  const searchList = useAppSelector(selectSearchList)
  const dispatch = useAppDispatch()
  return (
    <Stack align="center" justify="center">
      {labelIds.includes(SEARCH_LABEL) && (
        <CustomButton
          icon={<QiSearch />}
          label={`Search Query: "${searchList?.q}"`}
          onClick={() => dispatch(setInSearch(true))}
          suppressed
          title="Go back to search window"
        />
      )}
    </Stack>
  )
}

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
  const isProcessing = useAppSelector(selectIsProcessing)
  const isReplying = useAppSelector(selectIsReplying)
  const labelIds = useAppSelector(selectLabelIds)
  const searchList = useAppSelector(selectSearchList)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const storageLabels = useAppSelector(selectStorageLabels)
  const viewIndex = useAppSelector(selectViewIndex)
  const dispatch = useAppDispatch()
  const [shouldRefreshDetail, setShouldRefreshDetail] = useState(false)
  const isComposerActiveRef = useRef(false)
  const { threadId } = useParams<{
    threadId: string
    overviewId: string
  }>()
  const location = useLocation()
  const [activeEmailList, setActiveEmailList] = useState<TEmailListObject>()

  const showNoNavigation =
    coreStatus === CORE_STATUS_MAP.focused ||
    coreStatus === CORE_STATUS_MAP.sorting

  const isSearching = coreStatus === CORE_STATUS_MAP.searching

  useFetchEmailDetail({
    threadId,
    activeEmailList,
    forceRefresh: shouldRefreshDetail,
    setShouldRefreshDetail,
  })
  useFetchDraftList({
    shouldFetchDrafts: !!activeEmailList?.threads.some((thread) =>
      thread.messages.some((message) =>
        message?.labelIds?.includes(DRAFT_LABEL)
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
    if (coreStatus === CORE_STATUS_MAP.searching && searchList) {
      setActiveEmailList(searchList)
    } else {
      const targetEmailList = emailList[activeEmailListIndex]
      if (targetEmailList) {
        const selectedIds = selectedEmails?.selectedIds ?? []
        const hasTodoLabel = selectedEmails?.labelIds.includes(
          findLabelByName({ storageLabels, LABEL_NAME: TODO_LABEL_NAME })
            ?.id ?? ''
        )
        const hasInboxLabel = selectedEmails?.labelIds.includes(
          INBOX_LABEL
        )
        const isFocusedOrSorting =
          coreStatus === CORE_STATUS_MAP.focused ||
          (isFlexibleFlowActive &&
            coreStatus === CORE_STATUS_MAP.sorting)
        if (
          isFocusedOrSorting &&
          selectedIds.length > 0 &&
          (hasTodoLabel || hasInboxLabel)
        ) {
          const relevantThreadsFeed = targetEmailList.threads.filter((t) =>
            selectedIds.includes(t.id)
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

  // Based on the location and threadId, set the correct Redux state. Location state comes from openEmail function
  useEffect(() => {
    if (isReplying && !location?.state?.isReplying) {
      dispatch(setIsReplying(false))
    }
    if (isForwarding && !location?.state?.isForwarding) {
      dispatch(setIsForwarding(false))
    }
  }, [threadId])

  // If there is no viewIndex yet - set it by finding the index of the email.
  useEffect(() => {
    const hasViewIndex = viewIndex !== -1
    const hasActiveEmailList = !!activeEmailList
    const hasThreads = hasActiveEmailList && activeEmailList.threads.length > 0

    if (!hasViewIndex && hasThreads) {
      const index = activeEmailList.threads.findIndex(
        (item) => item.id === currentEmail
      )
      dispatch(setViewIndex(index))
    }
  }, [activeEmailList, currentEmail, viewIndex])

  // TODO: This should not filter out thrash messages when the user wants to see a trash message
  const noThrashMessages = useMemo(() => {
    if (activeEmailList) {
      return filterTrashMessages(activeEmailList.threads[viewIndex], labelIds)
    }
    return undefined
  }, [activeEmailList, labelIds, viewIndex])

  return activeEmailList ? (
    <Layout
      activePage={undefined}
      additionalHeader={isSearching ? <SearchButtonInHeader /> : undefined}
      headerTitle={getEmailHeader({
        coreStatus,
        labelIds,
        location,
        storageLabels,
      })}
      showBackButton
      showNavigation={!showNoNavigation}
    >
      <RenderEmailDetail
        activeEmailList={activeEmailList}
        setShouldRefreshDetail={setShouldRefreshDetail}
        showNoNavigation={showNoNavigation}
        threadDetail={noThrashMessages}
      />
    </Layout>
  ) : (
    <Baseloader />
  )
}

export default EmailDetail
