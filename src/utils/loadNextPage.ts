import { loadEmails } from '../Store/emailListSlice'

interface ILoadNextPage {
  q?: string
  nextPageToken: string | null
  labelIds?: string[]
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
    dispatch(loadEmails(params))
  }
}

export default loadNextPage
