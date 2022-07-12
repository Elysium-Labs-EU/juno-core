import { fetchEmails } from '../store/emailListSlice'
import {
  IEmailListObject,
  IEmailListObjectSearch,
} from '../store/storeTypes/emailListTypes'
import * as global from '../constants/globalConstants'

interface ILoadNextPage {
  q?: string
  nextPageToken: string | null
  labelIds: string[]
  dispatch: Function
  silentLoading?: boolean
  maxResults: number
}

const loadNextPage = ({
  q,
  nextPageToken,
  labelIds,
  dispatch,
  silentLoading,
  maxResults,
}: ILoadNextPage) => {
  if (nextPageToken) {
    const params = {
      q,
      labelIds,
      nextPageToken,
      maxResults,
      silentLoading,
    }
    dispatch(fetchEmails(params))
  }
}

export default loadNextPage

export const edgeLoadingNextPage = ({
  isSilentLoading,
  dispatch,
  labelIds,
  emailFetchSize,
  activeEmailList,
}: any) => {
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
