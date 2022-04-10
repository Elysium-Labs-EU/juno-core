import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import Session from 'supertokens-auth-react/recipe/session'
import { BASE_API_URL, errorHandling } from './api'

Session.addAxiosInterceptors(axios)

interface AllContactsQueryObject {
  readMask: string
  pageSize?: number
  nextPageToken?: string
}

interface QueryContactObject {
  readMask: string
  query: string
}

const contactApi = () => ({
  getAllContacts: async (query: AllContactsQueryObject) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/contacts/`,
        {
          params: {
            readMask: query.readMask,
            pageSize: query.pageSize ?? 1000,
            pageToken: query.nextPageToken ?? undefined,
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' }),
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  queryContacts: async (query: QueryContactObject) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/contact/search/`,
        {
          params: {
            readMask: query.readMask,
            query: query.query,
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' }),
        }
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default contactApi
