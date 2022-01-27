import { loadEmails } from '../Store/emailListSlice'
// import * as global from '../constants/globalConstants'

interface ILoadNextPage {
  q?: string
  nextPageToken: string | null
  labelIds?: string[]
  dispatch: Function
  silentLoading?: boolean
  emailFetchSize: number
}

const loadNextPage = ({
  q,
  nextPageToken,
  labelIds,
  dispatch,
  silentLoading,
  emailFetchSize 
}: ILoadNextPage) => {
  if (nextPageToken) {
    const params = {
      q,
      labelIds,
      nextPageToken,
      maxResults: emailFetchSize,
      silentLoading,
    }
    dispatch(loadEmails(params))
  }
}

export default loadNextPage
