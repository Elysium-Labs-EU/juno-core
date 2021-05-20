import axios from 'axios'
import qs from 'qs'

export const createApiClient = () => {
  return {
    getMessageDetail: (messageId) => {
      return axios
        .get(`/api/message/${messageId}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },

    getThreads: (query) => {
      return axios
        .get(`/api/threads/`, {
          params: {
            labelIds: query.labelIds,
            maxResults: query.maxResults ?? 20,
            pageToken: query.nextPageToken ?? undefined,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },

    getThreadDetail: (messageId) => {
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
    fetchLabel: () => {
      return axios
        .get(`/api/labels`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    createLabel: (body) => {
      console.log('body', body)
      return axios
        .post(`/api/labels`, body)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    updateLabel: (body) => {
      console.log('body', body)
      return axios
        .patch(`/api/labels`, body)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    deleteLabel: (id) => {
      console.log('id', id)
      return axios
        .delete(`/api/labels`, { data: { id: id }})
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
  }
}
