import { fetchEmailsSimple } from '../store/emailListSlice'
import { IEmailListObject } from '../store/storeTypes/emailListTypes'
import { AppDispatch } from '../store/store'
import * as global from '../constants/globalConstants'

interface ILoadNextPage {
  q?: string
  nextPageToken: string | null | undefined
  labelIds: string[]
  dispatch: AppDispatch
  silentLoading?: boolean
  maxResults: number
  fetchSimple?: boolean
}

const loadNextPage = ({
  q = undefined,
  nextPageToken,
  labelIds,
  dispatch,
  silentLoading = false,
  maxResults,
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
  isSilentLoading: boolean
  dispatch: AppDispatch
  labelIds: string[]
  emailFetchSize: number
  activeEmailList: IEmailListObject
}

export const edgeLoadingNextPage = ({
  isSilentLoading,
  dispatch,
  labelIds,
  emailFetchSize,
  activeEmailList,
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
