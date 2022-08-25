import { IEmailListThreadItem } from '../../store/storeTypes/emailListTypes'
import { decodeBase64 } from '../decodeBase64'
import findPayloadData from '../findPayloadBodyData'

/**
 * @function emailBody
 * @param threadDetail - takes in the complete active threadDetail object
 * @param selectedIndex - taknes in the selectedIndex to select this message
 * @returns a decoded string representing the selected message's body or undefined.
 */
const emailBody = (
  threadDetail: IEmailListThreadItem,
  selectedIndex: number,
  isForwarding?: boolean
) => {
  const query = 'Body'
  if (threadDetail) {
    const response = decodeBase64(
      findPayloadData(query, threadDetail, selectedIndex)
    )
    if (isForwarding && response) {
      const FORWARD_LABEL =
        '<p></p><p></p><p>---------- Forwarded message --------</p>'
      // Add the Forwarded message label
      const addedForwardedLabel = `${FORWARD_LABEL}${response}`
      return addedForwardedLabel
    }
    return response
  }
  return undefined
}

export default emailBody
