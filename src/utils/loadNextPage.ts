import { loadEmails } from '../Store/emailListSlice'
import * as global from '../constants/globalConstants'

interface ILoadNextPage {
  q?: string
  nextPageToken: string | null
  labelIds?: string[]
  dispatch: Function
  silentLoading?: boolean
}

const loadNextPage = ({
  q,
  nextPageToken,
  labelIds,
  dispatch,
  silentLoading,
}: ILoadNextPage) => {
  if (nextPageToken) {
    const params = {
      q,
      labelIds,
      nextPageToken,
      maxResults: global.MAX_RESULTS,
      silentLoading,
    }
    dispatch(loadEmails(params))
  }
}

export default loadNextPage
