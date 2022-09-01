import { fetchEmailsFull, fetchEmailsSimple } from '../store/emailListSlice'
import {
  IEmailListObject,
  IEmailListObjectSearch,
} from '../store/storeTypes/emailListTypes'
import * as global from '../constants/globalConstants'
import { AppDispatch } from '../store/store'

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
  fetchSimple = false,
}: ILoadNextPage) => {
  if (nextPageToken) {
    const params = {
      q,
      labelIds,
      nextPageToken,
      maxResults,
      silentLoading,
    }
    // Fetch Simple is used for overviews and search results. Full fetch is used during the email detail view and edge loading when on email detail.
    // For safety, resort to full fetching by default.
    if (fetchSimple) {
      dispatch(fetchEmailsSimple(params))
    } else {
      dispatch(fetchEmailsFull(params))
    }
  }
}

export default loadNextPage

interface IEdgeLoadingNextPage {
  isSilentLoading: boolean
  dispatch: AppDispatch
  labelIds: string[]
  emailFetchSize: number
  activeEmailList: IEmailListObject | IEmailListObjectSearch
}

export const edgeLoadingNextPage = ({
  isSilentLoading,
  dispatch,
  labelIds,
  emailFetchSize,
  activeEmailList,
}: IEdgeLoadingNextPage) => {
  if (!isSilentLoading) {
    if (Object.prototype.hasOwnProperty.call(activeEmailList, 'q')) {
      const { q, nextPageToken } = activeEmailList as IEmailListObjectSearch
      return loadNextPage({
        q,
        nextPageToken,
        dispatch,
        maxResults: global.MAX_RESULTS,
        silentLoading: true,
        labelIds,
      })
    }
    const { nextPageToken } = activeEmailList as IEmailListObject
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
