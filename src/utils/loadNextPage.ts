import { loadEmails } from '../Store/metaListSlice'
import * as local from '../constants/emailListConstants'

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
      maxResults: local.MAX_RESULTS,
      silentLoading,
    }
    dispatch(loadEmails(params))
  }
}

export default loadNextPage
