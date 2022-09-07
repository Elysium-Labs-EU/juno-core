import { useEffect } from 'react'
import { INBOX_LABEL } from '../constants/globalConstants'
import { fetchEmailsSimple } from '../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectLoadedInbox } from '../store/labelsSlice'
import { selectIsFlexibleFlowActive } from '../store/utilsSlice'
import isPromise from '../utils/isPromise'

/**
 * @function useFetchEmailsSimple
 * Function is currently only used by the InboxSortOption - to populate the inbox
 * @return {void} sends the response to the Redux state
 */

export default function useFetchEmailsSimple() {
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let mounted = true
    let emailPromise: any = {}
    // Only preload the messages when the strict flow is active
    if (!isFlexibleFlowActive && loadedInbox.indexOf(INBOX_LABEL) === -1) {
      const params = {
        labelIds: [INBOX_LABEL],
        maxResults: 10,
        nextPageToken: null,
      }

      if (mounted) {
        emailPromise = dispatch(fetchEmailsSimple(params))
      }
    }
    return () => {
      mounted = false
      if (isPromise(emailPromise)) {
        emailPromise.abort()
      }
    }
  }, [isFlexibleFlowActive, loadedInbox])
}
