import { AxiosResponse } from 'axios'
import qs from 'qs'
import { errorHandling, instance } from './api'

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
      const res: AxiosResponse<any> = await instance.get(`/api/contacts/`, {
        params: {
          readMask: query.readMask,
          pageSize: query.pageSize ?? 1000,
          pageToken: query.nextPageToken ?? undefined,
        },
        // TODO: Simplify this code
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: 'repeat' }),
      })
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  queryContacts: async (query: QueryContactObject) => {
    try {
      const res: AxiosResponse<any> = await instance.get(
        `/api/contact/search/`,
        {
          params: {
            readMask: query.readMask,
            query: query.query,
          },
          // TODO: Simplify this code
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
