import { AxiosResponse } from 'axios'
import { errorHandling, instance } from 'data/api'

const settingsApi = () => ({
  getSendAs: async (emailId: string) => {
    try {
      const res: AxiosResponse<any> = await instance.get(
        `/api/settings/getSendAs`,
        {
          params: {
            emailId,
          },
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  updateSendAs: async (emailId: string, request: { signature: string }) => {
    try {
      const res: AxiosResponse<any> = await instance.put(
        `/api/settings/updateSendAs`,
        {
          params: {
            emailId,
            request,
          },
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default settingsApi
