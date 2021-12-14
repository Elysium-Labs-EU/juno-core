import { EmailMessage } from '../../../Store/emailListTypes'
import findPayloadHeadersData from '../../../utils/findPayloadHeadersData'

export const NO_SENDER = '(No sender)'

const SenderNamePartial = (message: EmailMessage): string[] => {
  if (message) {
    const query = 'From'
    const from = findPayloadHeadersData(query, message)
    if (from.length > 0) {
      const splitted = from.split('<')
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
    return [NO_SENDER, NO_SENDER]
  }
  return [NO_SENDER, NO_SENDER]
}

export default SenderNamePartial
