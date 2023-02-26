import { useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { fetchEmailDetail } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'

interface IUseFetchEmailDetail {
  activeEmailList: TEmailListObject | undefined
  forceRefresh: boolean
  setShouldRefreshDetail: Dispatch<SetStateAction<boolean>>
  threadId: string | undefined
}

export default function useFetchEmailDetail({
  activeEmailList,
  forceRefresh,
  setShouldRefreshDetail,
  threadId,
}: IUseFetchEmailDetail) {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)

  // The hook may fire to update the emaildetail, whenever no thread has a body element, or whenever the composer closes (forceRefresh).
  useEffect(() => {
    let mounted = true
    if (threadId && activeEmailList) {
      // Create a map of threadIds to emailThreads
      const emailThreadsMap = new Map(
        activeEmailList.threads.map((thread) => [thread.id, thread])
      )
      // Find the emailThreadObject using the threadId
      const emailThreadObject = emailThreadsMap.get(threadId)
      if (emailThreadObject) {
        const emailWithBody = emailThreadObject.messages.filter(
          (message) => 'body' in message.payload
        )
        if (!emailWithBody.length || forceRefresh) {
          setShouldRefreshDetail(false)
          mounted &&
            dispatch(
              fetchEmailDetail({
                threadId,
                labelIds,
                q: activeEmailList?.q,
              })
            )
        }
      }
    }
    return () => {
      mounted = false
    }
  }, [threadId, activeEmailList, forceRefresh])
}
