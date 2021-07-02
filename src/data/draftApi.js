import axios from 'axios'

const draftApi = () => {
  return {
    getDrafts: async () => {
      try {
        const res = await axios.get(`/api/drafts/`)
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
  }
}

export default draftApi
