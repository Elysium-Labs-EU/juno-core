import { useEffect } from 'react'
import { fetchEmailDetail } from '../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectLabelIds } from '../store/labelsSlice'
import { IEmailListObject } from '../store/storeTypes/emailListTypes'

export default function useFetchEmailDetail({
  threadId,
  activeEmailList,
}: {
  threadId: string | undefined
  activeEmailList: IEmailListObject | undefined
}) {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)

  useEffect(() => {
    let mounted = true
    if (threadId && activeEmailList) {
      // First check if the thread already has a body, if not fetch it.
      const emailThreadObject = activeEmailList.threads.find(
        (item) => item.id === threadId
      )
      if (emailThreadObject) {
        const someThreadHasBody = emailThreadObject.messages.some((message) =>
          Object.prototype.hasOwnProperty.call(message.payload, 'body')
        )
        if (!someThreadHasBody) {
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
  }, [threadId, activeEmailList])
}
