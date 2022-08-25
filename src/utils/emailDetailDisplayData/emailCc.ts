import { IEmailListThreadItem } from '../../store/storeTypes/emailListTypes'
import convertToContact from '../convertToContact'
import findPayloadHeadersData from '../findPayloadHeadersData'

export default function ccEmail(threadDetail: IEmailListThreadItem) {
  const query = 'Cc'
  if (threadDetail) {
    const data: string = findPayloadHeadersData(query, threadDetail)
    return convertToContact(data)
  }
  return null
}
