import axios from 'axios'

const labelApi = () => {
  return {
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
    fetchLabel: async () => {
      try {
        const res = await axios.get(`/api/labels`)
        return res.data
      } catch (err) {
        return console.log(err)
      }
    },
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

export default labelApi
