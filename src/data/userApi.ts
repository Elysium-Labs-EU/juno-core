import axios from 'axios'
import { BASE_API_URL } from './api'

const userApi = () => ({
    fetchUser: async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/api/user`)
        return res
      } catch (err) {
        return console.log(err)
      }
    },
  })

export default userApi
