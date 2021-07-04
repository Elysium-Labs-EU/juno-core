import axios from 'axios'
import { BASE_API_URL } from './api'

const messageApi = () => {
  return {
    getMessageDetail: async (messageId) => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/message/${messageId}`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },

    getAttachment: async (messageId, attachmentId) => {
      console.log(messageId, attachmentId)
      try {
        const res = await axios.get(
          `${BASE_API_URL}/api/message/attachment/${messageId}/${attachmentId}`
        )
        return res
      } catch (err) {
        return console.log(err)
      }
    },

    downloadAttachment: async (messageId, attachmentId) => {
      try {
        const res = await axios.get(
          `${BASE_API_URL}/api/message/attachment/${messageId}/${attachmentId}`
        )
        return res
      } catch (err) {
        return console.log(err)
      }
    },
    sendMessage: async (data) => {
      console.log('data', data)
      try {
        const res = await axios.post(`${BASE_API_URL}/api/send-message`, data)
        return res
      } catch (err) {
        return console.log(err)
      }
    },
    updateMessage: async (props) => {
      const { messageId, request } = props
      try {
        const res = await axios.patch(
          `${BASE_API_URL}/api/message/${messageId}`,
          request
        )
        return res
      } catch (err) {
        return console.log(err)
      }
    },
    thrashMessage: async (messageId) => {
      console.log('trashed')
      try {
        const res = await axios.post(
          `${BASE_API_URL}/api/message/thrash/${messageId}`
        )
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
      try {
        const res = await axios.delete(`${BASE_API_URL}/api/message/`, {
          data: { id: messageId },
        })
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
  }
}

export default messageApi
