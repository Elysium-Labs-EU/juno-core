import { loadEmails } from '../Store/emailListSlice'
import * as global from '../constants/globalConstants'

const loadNextPage = ({
  nextPageToken,
  labelIds,
  dispatch,
  silentLoading,
}: {
  nextPageToken: string
  labelIds: string[]
  dispatch: any
  silentLoading?: boolean
}) => {
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
