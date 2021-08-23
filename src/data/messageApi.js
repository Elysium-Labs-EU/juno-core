import axios from 'axios'
import { BASE_API_URL, errorHandeling } from './api'

const messageApi = () => {
  return {
    getMessageDetail: async (messageId) => {
      try {
        const res = await axios.get(
          `${BASE_API_URL}/api/v1/message/${messageId}`
        )
        return res.data
      } catch (err) {
        return errorHandeling(err)
      }
    },

    getAttachment: async (props) => {
      const { messageId, attachmentId } = props
      try {
        const res = await axios.get(
          `${BASE_API_URL}/api/v1/message/attachment/${messageId}/${attachmentId}`
        )
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },

    sendMessage: async (data) => {
      try {
        const res = await axios.post(
          `${BASE_API_URL}/api/v1/send-message`,
          data
        )
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },
    updateMessage: async (props) => {
      const { messageId, request } = props
      try {
        const res = await axios.patch(
          `${BASE_API_URL}/api/v1/message/${messageId}`,
          request
        )
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },
    thrashMessage: async ({ messageId }) => {
      try {
        const res = await axios.post(
          `${BASE_API_URL}/api/v1/message/thrash/${messageId}`
        )
        return res
      } catch (err) {
        return errorHandeling(err)
      }
    },
    // unThrashMessage: (messageId) => {
    //   console.log('trashed')
    //   return axios
    //     .post(`/api/v1/message/thrash/${messageId}`)
    //     .then((res) => res.data)
    //     .catch((err) => console.log(err))
    // },
    deleteMessage: async (messageId) => {
      try {
        const res = await axios.delete(`${BASE_API_URL}/api/v1/message/`, {
          data: { id: messageId },
        })
        return res.data
      } catch (err) {
        return errorHandeling(err)
      }
    },
  }
}

export default messageApi
