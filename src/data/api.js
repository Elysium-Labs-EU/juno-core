import axios from 'axios'
import qs from 'qs'

const BASE_API_URL = 'http://localhost:5000'

const createApiClient = () => {
  return {
    getMessageDetail: async (messageId) => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/message/${messageId}`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },

    getThreads: async (query) => {
      try {
        const res = await axios.get(`/api/threads/`, {
          params: {
            labelIds: query.labelIds,
            maxResults: query.maxResults ?? 20,
            pageToken: query.nextPageToken ?? undefined,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          },
        })
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },

    getDrafts: async () => {
      try {
        const res = await axios.get(`/api/drafts/`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },

    getThreadDetail: async (messageId) => {
      try {
        const res = await axios.get(`/api/thread/${messageId}`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },

    getDraftDetail: async (draftId) => {
      console.log(draftId)
      try {
        const res = await axios.get(`/api/draft/${draftId}`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },

    getAttachment: async (messageId, attachmentId) => {
      try {
        const res = await axios.get(
          `/api/message/attachment/${messageId}/${attachmentId}`
        )
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
    sendMessage: async (data) => {
      console.log('data', data)
      try {
        const res = await axios.post('/api/send-message', data)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
    updateMessage: async (messageId, body) => {
      console.log('body', body)
      try {
        const res = await axios.patch(`/api/message/${messageId}`, body)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
    thrashMessage: async (messageId) => {
      console.log('trashed')
      try {
        const res = await axios.post(`/api/message/thrash/${messageId}`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
    // unThrashMessage: (messageId) => {
    //   console.log('trashed')
    //   return axios
    //     .post(`/api/message/thrash/${messageId}`)
    //     .then((res) => res.data)
    //     .catch((err) => console.log(err))
    // },
    deleteMessage: async (messageId) => {
      console.log('deleted')
      try {
        const res = await axios.delete(`/api/message/`, {
          data: { id: messageId },
        })
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
    fetchLabel: async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/labels`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
    // createLabel: (body) => {
    //   console.log('body', body)
    //   return axios
    //     .post(`/api/labels`, body)
    //     .then((res) => res.data)
    //     .then((res) => {
    //       if (res.status === 'success') {

    //       })
    //     .catch((err) => console.log(err))
    // },
    updateLabel: async (body) => {
      console.log('body', body)
      try {
        const res = await axios.patch(`/api/labels`, body)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
    deleteLabel: async (id) => {
      console.log('id', id)
      try {
        const res = await axios.delete(`/api/labels`, { data: { id } })
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
    createDraft: async (body) => {
      console.log('body', body)
      try {
        const res = await axios.post(`/api/labels`, body)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
  }
}

export default createApiClient
