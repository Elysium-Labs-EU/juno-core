import axios from 'axios'

export const createApiClient = () => {
  return {
    getInitialThreads: () => {
      return axios
        .get(`/api/threads/`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    getAdditionalThreads: (nextPageToken) => {
      return axios
        .get(`/api/threads/${nextPageToken}`)
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
