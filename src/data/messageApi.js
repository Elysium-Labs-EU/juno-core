import axios from 'axios'

const messageApi = () => {
  return {
    getMessageDetail: async (messageId) => {
      try {
        const res = await axios.get(`/api/message/${messageId}`)
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
        return res
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
      try {
        const res = await axios.delete(`/api/message/`, {
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
