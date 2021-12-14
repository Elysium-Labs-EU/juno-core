import findPayloadHeadersData from '../../utils/findPayloadHeadersData'

const NO_RECIPIENT = '(No recipient)'

const RecipientName = (email: any): string[] => {
  const query = 'To'
  if (email) {
    const to = findPayloadHeadersData(query, email)
    if (to.length > 0) {
      const splitted = to.split('<')
      if (splitted.length > 1) {
        const cleanUpFirstPart: string = splitted[0].trim().replace(/(")+/g, '')
        const cleanUpSecondPart: string = splitted[1]
          .substring(0, splitted[1].length - 1)
          .replace(/(")+/g, '')
        return [cleanUpFirstPart, cleanUpSecondPart]
      }
      if (splitted.length === 1) {
        splitted[0].replace(/(")+/g, '')
        return [splitted[0], splitted[0]]
      }
    }
    return [NO_RECIPIENT, NO_RECIPIENT]
  }
  return [NO_RECIPIENT, NO_RECIPIENT]
}

export default RecipientName
