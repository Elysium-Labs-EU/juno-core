import { EmailMessage } from '../../Store/emailListTypes'
import findPayloadHeadersData from '../../utils/findPayloadHeadersData'

const BCCNameFull = (message: EmailMessage, query: string): string => {
  if (message) {
    const fetchedData = findPayloadHeadersData(query, message)
    if (fetchedData.length > 0) {
      return fetchedData
    }
    return ''
  }
  return ''
}

export default BCCNameFull
