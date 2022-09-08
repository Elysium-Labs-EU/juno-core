import { useEffect } from 'react'

import * as global from '../constants/globalConstants'
import { fetchDrafts } from '../store/draftsSlice'
import { selectViewIndex } from '../store/emailDetailSlice'
import { fetchEmailsSimple, refreshEmailFeed } from '../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectLabelIds, selectLoadedInbox } from '../store/labelsSlice'
import { selectEmailListSize, selectIsProcessing } from '../store/utilsSlice'
import isPromise from '../utils/isPromise'

let timestampLastFiredWithLabel = { label: [''], timeStamp: 0 }

export default function useFetchEmailsDrafts() {
  const isProcessing = useAppSelector(selectIsProcessing)
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const labelIds = useAppSelector(selectLabelIds)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const viewIndex = useAppSelector(selectViewIndex)
  const dispatch = useAppDispatch()

  // If the box is empty, and the history feed is adding the item to the feed
  // there is no next page token and the feed is only that shallow item.
  useEffect(() => {
    let mounted = true
    let emailPromise: any = {}
    let draftPromise: any = {}
    if (
      labelIds &&
      labelIds.length > 0 &&
      !labelIds.includes(global.SEARCH_LABEL)
    ) {
      // This variable checks whether the current request isn't within a too short time period for a similar request.
      const isTooSoon =
        timestampLastFiredWithLabel.label !== labelIds &&
        Date.now() - timestampLastFiredWithLabel.timeStamp <
          global.MIN_DELAY_REFRESH

      const inboxIsLoaded = labelIds.some(
        (val) => loadedInbox.indexOf(val) !== -1
      )
      if (!inboxIsLoaded) {
        const params = {
          labelIds,
          maxResults: emailFetchSize,
          nextPageToken: null,
        }

        if (mounted) {
          timestampLastFiredWithLabel = {
            label: labelIds,
            timeStamp: Date.now(),
          }
          emailPromise = dispatch(fetchEmailsSimple(params))
        }
        if (labelIds.includes(global.DRAFT_LABEL) && mounted && !isTooSoon) {
          draftPromise = dispatch(fetchDrafts())
        }
      }
      if (inboxIsLoaded && !isTooSoon) {
        // isProcessing is used to determine if the application is still processing requests to the Gmail backend.
        if (mounted && !isProcessing) {
          dispatch(refreshEmailFeed())

          timestampLastFiredWithLabel = {
            label: labelIds,
            timeStamp: Date.now(),
          }
        }
        if (labelIds.includes(global.DRAFT_LABEL) && mounted) {
          draftPromise = dispatch(fetchDrafts())
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
  }, [labelIds, window.location, viewIndex, isProcessing, loadedInbox])
}
