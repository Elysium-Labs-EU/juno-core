import { IEmailListThreadItem } from '../../store/storeTypes/emailListTypes'
import convertToContact from '../convertToContact'
import findPayloadHeadersData from '../findPayloadHeadersData'

export default function bccEmail(threadDetail: IEmailListThreadItem) {
  const query = 'Bcc'
  if (threadDetail) {
    const data: string = findPayloadHeadersData(query, threadDetail)
    return convertToContact(data)
  }
  return null
}
