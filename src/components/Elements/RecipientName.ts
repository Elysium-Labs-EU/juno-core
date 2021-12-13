import findPayloadHeadersData from '../../utils/findPayloadHeadersData'

const RecipientName = (email: any): string => {
  const query = 'To'
  if (email) {
    const to = findPayloadHeadersData(query, email)
    return to.length > 0 ? to : '(No recipient)'
  }
  return ''
}

export default RecipientName
