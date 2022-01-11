import { loadEmails } from '../Store/emailListSlice'
import * as global from '../constants/globalConstants'

interface ILoadNextPage {
  nextPageToken: string
  labelIds: string[]
  dispatch: Function
  silentLoading?: boolean
}

const loadNextPage = ({
  nextPageToken,
  labelIds,
  dispatch,
  silentLoading,
}: ILoadNextPage) => {
  if (labelIds && nextPageToken) {
    const params = {
      labelIds,
      nextPageToken,
      maxResults: global.MAX_RESULTS,
      silentLoading,
    }
    dispatch(loadEmails(params))
  }
}

export default loadNextPage
