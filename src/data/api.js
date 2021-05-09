import axios from 'axios'

export const createApiClient = () => {
  return {
    getInitialMessages: (labelIds) => {
      return axios
        .get(`/api/messages/${labelIds}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    getAdditionalMessages: (labelIds, nextPageToken) => {
      return axios
        .get(`/api/messages/${labelIds}/${nextPageToken}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    getMessageDetail: (messageId) => {
      // console.log(messageId)
      return axios
        .get(`/api/message/${messageId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
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
    getThreadDetail: (messageId) => {
      // console.log(messageId)
      return axios
        .get(`/api/thread/${messageId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    getAttachment: (messageId, attachmentId) => {
      return axios
        .get(`/api/message/attachment/${messageId}/${attachmentId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    sendMessage: (data) => {
      console.log('data', data)
      return axios
        .post('/api/send-message', data)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    updateMessage: (messageId, body) => {
      console.log('body', body)
      return axios
        .patch(`/api/message/${messageId}`, body)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    thrashMessage: (messageId) => {
      console.log('trashed')
      return axios
        .post(`/api/message/thrash/${messageId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
  }
}
