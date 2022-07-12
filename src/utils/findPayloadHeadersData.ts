import { MessagePayload } from '../store/storeTypes/draftsTypes'

/**
 * This function will fetch the payload header from the requested message
 * @param query - the header to look for
 * @param email - the object where to query the messages from
 * @param requestedIndex - optional requested index, if not present it will pick the headers from the last message
 * @returns either a the requested header's value or an empty string.
 */

export default function findPayloadHeadersData(
  query: string,
  email: any,
  requestedIndex?: number
) {
  if (email && query) {
    if (email.internalDate) {
      if (email.payload.headers.find((e: MessagePayload) => e.name === query)) {
        return email.payload.headers.find(
          (e: MessagePayload) => e.name === query
        ).value
      }
      if (
        email.payload.headers.find(
          (e: MessagePayload) => e.name === query.toLowerCase()
        )
      ) {
        return email.payload.headers.find(
          (e: MessagePayload) => e.name === query.toLowerCase()
        ).value
      }
      return ''
    }
    if (
      email.messages[requestedIndex || email.messages.length - 1].internalDate
    ) {
      if (
        email.messages[
          requestedIndex || email.messages.length - 1
        ].payload.headers.find((e: MessagePayload) => e.name === query)
      ) {
        return email.messages[
          requestedIndex || email.messages.length - 1
        ].payload.headers.find((e: MessagePayload) => e.name === query).value
      }
      if (
        email.messages[
          requestedIndex || email.messages.length - 1
        ].payload.headers.find(
          (e: MessagePayload) => e.name === query.toLowerCase()
        )
      ) {
        return email.messages[
          requestedIndex || email.messages.length - 1
        ].payload.headers.find(
          (e: MessagePayload) => e.name === query.toLowerCase()
        ).value
      }
      return ''
    }
  }
  return ''
}
