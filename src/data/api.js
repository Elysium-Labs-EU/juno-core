import axios from 'axios'

export const createApiClient = () => {
  return {
    getInitialThreads: (labelIds) => {
      return axios
        .get(`/api/threads/${labelIds}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    getAdditionalThreads: (labelIds, nextPageToken) => {
      return axios
        .get(`/api/threads/${labelIds}/${nextPageToken}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    getMessageDetail: (messageId) => {
      return axios
        .get(`/api/message/${messageId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
  }
}
