import { useEffect } from 'react'

import { selectViewIndex } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import { selectEmailListSize, selectIsSilentLoading } from 'store/utilsSlice'
import { edgeLoadingNextPage } from 'utils/loadNextPage'

interface IUseEdgeLoadNextPage {
  activeEmailList: TEmailListObject | undefined
}

export default function useEdgeLoadNextPage({
  activeEmailList,
}: IUseEdgeLoadNextPage) {
  const dispatch = useAppDispatch()
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const labelIds = useAppSelector(selectLabelIds)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const viewIndex = useAppSelector(selectViewIndex)

  useEffect(() => {
    // Attempt to load the next emails on the background when approaching the edge
    if (
      activeEmailList &&
      activeEmailList.threads.length - 1 - viewIndex <= 4 &&
      activeEmailList.nextPageToken &&
      !isSilentLoading
    ) {
      edgeLoadingNextPage({
        isSilentLoading,
        dispatch,
        labelIds,
        emailFetchSize,
        activeEmailList,
      })
    }
  }, [activeEmailList, emailFetchSize, isSilentLoading, labelIds, viewIndex])
}
