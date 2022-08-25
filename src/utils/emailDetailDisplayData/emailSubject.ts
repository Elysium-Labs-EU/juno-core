import { IEmailListThreadItem } from '../../store/storeTypes/emailListTypes'
import findPayloadHeadersData from '../findPayloadHeadersData'

export default function emailSubject(threadDetail: IEmailListThreadItem) {
  const query = 'Subject'
  if (threadDetail) {
    return findPayloadHeadersData(query, threadDetail)
  }
  return null
}
