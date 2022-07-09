/**
 * This function will fetch the payload body from the requested message
 * @param query - the object to look for
 * @param email - the object where to query the messages from
 * @param requestedIndex - optional requested index, if not present it will pick the payload from the last message
 * @returns either a the requested payload's value or an empty string.
 */

export default function findPayloadData(
  query: string,
  email: any,
  requestedIndex?: number
) {
  if (email && query) {
    if (email.internalDate) {
      if (email.payload[query]) {
        return email.payload[query].data
      }
      if (email.payload[query.toLowerCase()]) {
        return email.payload[query.toLowerCase()].data
      }
      return ''
    }
    if (
      email.messages[requestedIndex || email.messages.length - 1].internalDate
    ) {
      if (
        email.messages[requestedIndex || email.messages.length - 1].payload[
          query
        ]
      ) {
        return email.messages[requestedIndex || email.messages.length - 1]
          .payload[query].data
      }
      if (
        email.messages[requestedIndex || email.messages.length - 1].payload[
          query.toLowerCase()
        ]
      ) {
        return email.messages[requestedIndex || email.messages.length - 1]
          .payload[query.toLowerCase()].data
      }
      return ''
    }
  }
  return ''
}
