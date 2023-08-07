import * as global from 'constants/globalConstants'
import { fetchEmailsSimple } from 'store/emailListSlice'
import type { AppThunkDispatch } from 'store/store'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

interface LoadNextPage {
  dispatch: AppThunkDispatch
  fetchSimple?: boolean
  labelIds: TLabelState['labelIds']
  maxResults: number
  nextPageToken: string | null | undefined
  q?: string
  silentLoading?: boolean
}

const loadNextPage = ({
  dispatch,
  labelIds,
  maxResults,
  nextPageToken,
  q = undefined,
  silentLoading = false,
}: LoadNextPage) => {
  if (nextPageToken && nextPageToken !== global.HISTORY_NEXT_PAGETOKEN) {
    const params = {
      q,
      labelIds,
      nextPageToken,
      maxResults,
      silentLoading,
    }
    void dispatch(fetchEmailsSimple(params))
  }
}

export default loadNextPage

interface EdgeLoadingNextPage {
  activeEmailList: TEmailListObject
  dispatch: AppThunkDispatch
  emailFetchSize: number
  isSilentLoading: boolean
  labelIds: TLabelState['labelIds']
}

export const edgeLoadingNextPage = ({
  activeEmailList,
  dispatch,
  emailFetchSize,
  isSilentLoading,
  labelIds,
}: EdgeLoadingNextPage) => {
  if (!isSilentLoading) {
    if ('q' in activeEmailList && activeEmailList.q !== undefined) {
      const { q, nextPageToken } = activeEmailList
      loadNextPage({
        q,
        nextPageToken,
        dispatch,
        maxResults: emailFetchSize,
        silentLoading: true,
        labelIds: [],
      })
      return
    }
    const { nextPageToken } = activeEmailList
    loadNextPage({
      nextPageToken,
      labelIds,
      dispatch,
      maxResults: emailFetchSize,
      silentLoading: true,
    })
    return
  }
  return null
}
