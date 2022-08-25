import { IEmailListThreadItem } from '../../store/storeTypes/emailListTypes'
import convertToContact from '../convertToContact'
import findPayloadHeadersData from '../findPayloadHeadersData'

export default function fromEmail(threadDetail: IEmailListThreadItem) {
  const query = 'From'
  if (threadDetail) {
    const data: string = findPayloadHeadersData(query, threadDetail)
    return convertToContact(data)
  }
  return null
}
