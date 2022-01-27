import { loadEmails } from '../Store/emailListSlice'
// import * as global from '../constants/globalConstants'

interface ILoadNextPage {
  nextPageToken: string
  labelIds: string[]
  dispatch: Function
  silentLoading?: boolean
  emailFetchSize: number
}

const loadNextPage = ({
  nextPageToken,
  labelIds,
  dispatch,
  silentLoading,
  emailFetchSize 
}: ILoadNextPage) => {
  if (labelIds && nextPageToken) {
    const params = {
      labelIds,
      nextPageToken,
      maxResults: emailFetchSize,
      silentLoading,
    }
    dispatch(loadEmails(params))
  }
}

export default loadNextPage
