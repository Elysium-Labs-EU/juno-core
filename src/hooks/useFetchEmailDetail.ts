import { useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import { fetchEmailDetail } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import type { IEmailListObject } from 'store/storeTypes/emailListTypes'

export default function useFetchEmailDetail({
  activeEmailList,
  forceRefresh,
  setShouldRefreshDetail,
  threadId,
}: {
  activeEmailList: IEmailListObject | undefined
  forceRefresh: boolean
  setShouldRefreshDetail: Dispatch<SetStateAction<boolean>>
  threadId: string | undefined
}) {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)
  const emailThreadObject = activeEmailList?.threads.find(
    (item) => item.id === threadId
  )
  const someThreadHasBody = emailThreadObject
    ? emailThreadObject.messages.some((message) =>
        Object.prototype.hasOwnProperty.call(message.payload, 'body')
      )
    : undefined
  useEffect(() => {
    let mounted = true
    if (threadId && activeEmailList && (!someThreadHasBody || forceRefresh)) {
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
    return () => {
      mounted = false
    }
  }, [threadId, activeEmailList, forceRefresh, someThreadHasBody])
}
