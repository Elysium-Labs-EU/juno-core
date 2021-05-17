import axios from 'axios'
import qs from 'qs'

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
    getInitialThreads: (labelIds, maxResults) => {
      console.log(maxResults)
      return axios
        // .get(`/api/threads/${labelIds}/${maxResults}`)
        .get(`/api/threads/`, {
          params: { labelIds: labelIds, maxResults: maxResults ?? 10 },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    getAdditionalThreads: (labelIds, nextPageToken, maxResults) => {
      console.log(maxResults)
      return axios
        .get(`/api/threads/${labelIds}/${maxResults}/${nextPageToken}`)
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


    // getJobOpenings: (body) => {
    //   console.log('body', body)
    //   // const HEADER = fetchToken()
    //   const token = localStorage.getItem('sessionToken')
    //   return axios
    //     .get(`${BASE_API_URL}/jobs/job_listing/`, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //       params: { page: body.page ?? 0, keywords: body.keyword },
    //       paramsSerializer: (params) => {
    //         return qs.stringify(params, { arrayFormat: 'repeat' })
    //       },
    //     })
    //     .then((res) => res.data)
    //     .catch((err) => console.error(err))
    // },