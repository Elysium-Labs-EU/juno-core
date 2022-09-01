import { useEffect, useState } from 'react'
import { fetchDrafts } from '../../store/draftsSlice'
import {
  fetchEmailsSimple,
  refreshEmailFeed,
  selectActiveEmailListIndex,
  selectEmailList,
  setActiveEmailListIndex,
} from '../../store/emailListSlice'
import { selectLabelIds, selectLoadedInbox } from '../../store/labelsSlice'
import {
  selectEmailListSize,
  selectIsLoading,
  selectIsProcessing,
} from '../../store/utilsSlice'
import EmptyState from '../Elements/EmptyState'
import LoadingState from '../Elements/LoadingState/LoadingState'
import * as global from '../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IEmailListObject } from '../../store/storeTypes/emailListTypes'
import getEmailListIndex from '../../utils/getEmailListIndex'
import isPromise from '../../utils/isPromise'
import handleSessionStorage from '../../utils/handleSessionStorage'
import { resetEmailDetail, selectViewIndex } from '../../store/emailDetailSlice'
import RenderEmailList from './RenderEmailList'

const LabeledInbox = ({
  emailList,
  activeEmailListIndex,
}: {
  emailList: IEmailListObject[]
  activeEmailListIndex: number
}) => {
  if (emailList && activeEmailListIndex > -1) {
    // Show the list of emails that are connected to the labelId mailbox.
    return <RenderEmailList filteredOnLabel={emailList[activeEmailListIndex]} />
  }
  return <EmptyState />
}

const EmailList = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const emailList = useAppSelector(selectEmailList)
  const isLoading = useAppSelector(selectIsLoading)
  const isProcessing = useAppSelector(selectIsProcessing)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const viewIndex = useAppSelector(selectViewIndex)
  const dispatch = useAppDispatch()

  // If the box is empty, and the history feed is adding the item to the feed
  // there is no next page token and the feed is only that shallow item.
  useEffect(() => {
    let mounted = true
    let emailPromise: any = {}
    let draftPromise: any = {}
    if (labelIds && !labelIds.includes(global.SEARCH_LABEL)) {
      if (labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1)) {
        const params = {
          labelIds,
          maxResults: emailFetchSize,
          nextPageToken: null,
        }

        if (mounted) {
          emailPromise = dispatch(fetchEmailsSimple(params))
        }
        if (labelIds.includes(global.DRAFT_LABEL) && mounted) {
          draftPromise = dispatch(fetchDrafts())
        }
      }
      if (labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1)) {
        if (
          emailList.length > 0 &&
          emailList.filter((emailSubList) =>
            emailSubList.labels?.includes(labelIds[0])
          ).length > 0 &&
          viewIndex === -1
        ) {
          if (
            mounted &&
            Date.now() -
            (parseInt(handleSessionStorage(global.LAST_REFRESH), 10)
              ? parseInt(handleSessionStorage(global.LAST_REFRESH), 10)
              : 0) >
            global.MIN_DELAY_REFRESH &&
            !isRefreshing &&
            !isProcessing
          ) {
            setIsRefreshing(true)
            dispatch(refreshEmailFeed())
          }
          if (labelIds.includes(global.DRAFT_LABEL) && mounted) {
            draftPromise = dispatch(fetchDrafts())
          }
        }
      }
    }
    return () => {
      mounted = false
      if (isPromise(emailPromise)) {
        emailPromise.abort()
      }
      if (isPromise(draftPromise)) {
        draftPromise.abort()
      }
    }
  }, [labelIds, window.location, viewIndex, isProcessing])

  // Run a clean up function to ensure that the email detail values are always back to base values.
  useEffect(() => {
    dispatch(resetEmailDetail())
  }, [])

  // Sync the emailListIndex with Redux
  useEffect(() => {
    const emailListIndex = getEmailListIndex({ emailList, labelIds })
    if (emailListIndex > -1 && activeEmailListIndex !== emailListIndex) {
      dispatch(setActiveEmailListIndex(emailListIndex))
    }
  }, [emailList, labelIds])

  return (
    <>
      {labelIds.some((val) => loadedInbox.flat(1).indexOf(val) > -1) &&
        activeEmailListIndex > -1 && (
          <LabeledInbox
            emailList={emailList}
            activeEmailListIndex={activeEmailListIndex}
          />
        )}
      {(isLoading || activeEmailListIndex === -1) &&
        labelIds.some((val) => loadedInbox.flat(1).indexOf(val) === -1) && (
          <LoadingState />
        )}
    </>
  )
}

export default EmailList
