import { useEffect } from 'react'

import * as global from 'constants/globalConstants'
import { fetchDrafts } from 'store/draftsSlice'
import { fetchEmailsSimple, refreshEmailFeed } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLoadedInbox } from 'store/labelsSlice'
import { selectEmailListSize } from 'store/utilsSlice'
import isPromise from 'utils/isPromise'

let timestampLastFiredWithLabel = { labelIds: [''], timeStamp: 0 }

// Intention is to block the same type of request within a certain time period.
const handleRequestTiming = (labelIds: string[], firedTimeStamp: number) => {
  if (
    labelIds.length === 0 ||
    labelIds !== timestampLastFiredWithLabel.labelIds
  ) {
    // If the request labelIds isnt stored already, store the request and allow the request to proceed
    timestampLastFiredWithLabel = { labelIds, timeStamp: firedTimeStamp }
    return true
  }
  if (
    !timestampLastFiredWithLabel.timeStamp ||
    firedTimeStamp - timestampLastFiredWithLabel.timeStamp >
      global.MIN_DELAY_REFRESH
  ) {
    // If the request has the same labelIds, but is outside the set threshold to fire, allow the request to proceed
    timestampLastFiredWithLabel = { labelIds, timeStamp: firedTimeStamp }
    return true
  }
  // If none of the above passes, do not let the request pass
  return false
}

export default function useFetchEmailsDrafts(
  labelIds: string[],
  firedTimeStamp: number
) {
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const dispatch = useAppDispatch()

  // If the box is empty, and the history feed is adding the item to the feed
  // there is no next page token and the feed is only that shallow item.
  useEffect(() => {
    let mounted = true
    let emailPromise: any = {}
    let draftPromise: any = {}
    // This variable checks whether the current request isn't within a too short time period for a similar request.
    const allowedToFire = handleRequestTiming(labelIds, firedTimeStamp)

    if (
      labelIds &&
      labelIds.length > 0 &&
      allowedToFire &&
      !labelIds.includes(global.SEARCH_LABEL)
    ) {
      // Prevent this hook to be fired when the user comes back from Search mode. There is no Search label.
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
            labelIds,
            timeStamp: Date.now(),
          }
          emailPromise = dispatch(fetchEmailsSimple(params))
        }
        if (labelIds.includes(global.DRAFT_LABEL) && mounted) {
          draftPromise = dispatch(fetchDrafts())
        }
      }
      if (inboxIsLoaded) {
        if (mounted) {
          timestampLastFiredWithLabel = {
            labelIds,
            timeStamp: Date.now(),
          }
          // TODO: Refactor this to be an asyncThunk, or at least have an abort controller.
          dispatch(refreshEmailFeed())
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
  }, [labelIds])
}
