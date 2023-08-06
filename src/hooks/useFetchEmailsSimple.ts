import { useEffect } from 'react'

import * as global from 'constants/globalConstants'
import { fetchEmailsSimple } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLoadedInbox } from 'store/labelsSlice'
import { selectIsFlexibleFlowActive } from 'store/utilsSlice'

/**
 * @function useFetchEmailsSimple
 * Function is currently only used by the InboxSortOption - to populate the inbox
 * The timestampLastFired variable is to throttle the number of requests made
 * @return {void} sends the response to the Redux state
 */

let timestampLastFired = 0

export default function useFetchEmailsSimple() {
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Only preload the messages when the strict flow is active
    if (
      (timestampLastFired === 0 ||
        timestampLastFired - Date.now() > global.MIN_DELAY_REFRESH) &&
      !isFlexibleFlowActive &&
      !loadedInbox.includes(global.INBOX_LABEL)
    ) {
      timestampLastFired = Date.now()
      const params = {
        labelIds: [global.INBOX_LABEL],
        maxResults: 10,
        nextPageToken: null,
      }

      dispatch(fetchEmailsSimple(params))
    }
  }, [isFlexibleFlowActive, loadedInbox])
}
