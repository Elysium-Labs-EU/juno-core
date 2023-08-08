import { useEffect, useRef } from 'react'

import * as global from 'constants/globalConstants'
import { fetchDrafts } from 'store/draftsSlice'
import { fetchEmailsSimple, refreshEmailFeed } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLoadedInbox } from 'store/labelsSlice'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import { selectEmailListSize } from 'store/utilsSlice'

// let timestampLastFiredWithLabel = { labelIds: [''], timeStamp: 0 }

// Intention is to block the same type of request within a certain time period.
const handleRequestTiming = (
  labelIds: TLabelState['labelIds'],
  firedTimeStamp: number,
  timestampLastFired: React.MutableRefObject<{ labelIds: TLabelState['labelIds'], timeStamp: number }>
) => {
  if (
    labelIds.length === 0 ||
    labelIds !== timestampLastFired.current.labelIds
  ) {
    // If the request labelIds isnt stored already, store the request and allow the request to proceed
    timestampLastFired.current = { labelIds, timeStamp: firedTimeStamp }
    return true
  }
  if (
    !timestampLastFired.current.timeStamp ||
    firedTimeStamp - timestampLastFired.current.timeStamp >
    global.MIN_DELAY_REFRESH
  ) {
    // If the request has the same labelIds, but is outside the set threshold to fire, allow the request to proceed
    timestampLastFired.current = { labelIds, timeStamp: firedTimeStamp }
    return true
  }
  // If none of the above passes, do not let the request pass
  return false
}

export default function useFetchEmailsDrafts(
  labelIds: TLabelState['labelIds'],
  firedTimeStamp: number
) {
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const dispatch = useAppDispatch()
  const timestampLastFired = useRef({ labelIds: [''], timeStamp: 0 })

  // If the box is empty, and the history feed is adding the item to the feed
  // there is no next page token and the feed is only that shallow item.
  useEffect(() => {
    // This variable checks whether the current request isn't within a too short time period for a similar request.
    const allowedToFire = handleRequestTiming(labelIds, firedTimeStamp, timestampLastFired)

    if (labelIds.length === 0 || !allowedToFire || labelIds.includes(global.SEARCH_LABEL)) {
      return
    }

    // Prevent this hook to be fired when the user comes back from Search mode. There is no Search label.
    const inboxIsLoaded = labelIds.some((val) => loadedInbox.includes(val))
    const emailFetching = () => {
      timestampLastFired.current = {
        labelIds,
        timeStamp: Date.now(),
      }
      if (!inboxIsLoaded) {
        const params = {
          labelIds,
          maxResults: emailFetchSize,
          nextPageToken: null,
        }
        return dispatch(fetchEmailsSimple(params))
      }
      dispatch(refreshEmailFeed())
    }

    const draftFetching = () => {
      if (labelIds.includes(global.DRAFT_LABEL)) {
        return dispatch(fetchDrafts())
      }
    }

    const emailPromise = emailFetching()
    const draftPromise = draftFetching()

    return () => {
      emailPromise?.abort()
      draftPromise?.abort()
    }

  }, [labelIds])
}
