import * as global from 'constants/globalConstants'
import { fetchEmailsSimple } from 'store/emailListSlice'
import type { AppDispatch } from 'store/store'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

// TODO: Update these types

interface ILoadNextPage {
  dispatch: AppDispatch
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
}: ILoadNextPage) => {
  if (nextPageToken && nextPageToken !== global.HISTORY_NEXT_PAGETOKEN) {
    const params = {
      q,
      labelIds,
      nextPageToken,
      maxResults,
      silentLoading,
    }
    dispatch(fetchEmailsSimple(params))
  }
}

export default loadNextPage

interface IEdgeLoadingNextPage {
  activeEmailList: TEmailListObject
  dispatch: AppDispatch
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
}: IEdgeLoadingNextPage) => {
  if (!isSilentLoading) {
    if ('q' in activeEmailList && activeEmailList.q !== undefined) {
      const { q, nextPageToken } = activeEmailList
      return loadNextPage({
        q,
        nextPageToken,
        dispatch,
        maxResults: emailFetchSize,
        silentLoading: true,
        labelIds: [],
      })
    }
    const { nextPageToken } = activeEmailList
    return loadNextPage({
      nextPageToken,
      labelIds,
      dispatch,
      maxResults: emailFetchSize,
      silentLoading: true,
    })
  }
  return null
}
