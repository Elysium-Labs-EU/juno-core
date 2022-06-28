import { MessagePayload } from '../Store/storeTypes/draftsTypes'

const findPayloadHeadersData = (query: string, email: any) => {
  if (email && query) {
    if (email.internalDate) {
      if (email.payload.headers.find((e: MessagePayload) => e.name === query)) {
        return email.payload.headers.find(
          (e: MessagePayload) => e.name === query
        ).value
      }
      if (
        email.payload.headers.find(
          (e: MessagePayload) =>
            e.name === `${query[0].toLowerCase() + query.slice(1)}`
        )
      ) {
        return email.payload.headers.find(
          (e: MessagePayload) =>
            e.name === `${query[0].toLowerCase() + query.slice(1)}`
        ).value
      }
      return ''
    }
    if (email.messages[email.messages.length - 1].internalDate) {
      if (
        email.messages[email.messages.length - 1].payload.headers.find(
          (e: MessagePayload) => e.name === query
        )
      ) {
        return email.messages[email.messages.length - 1].payload.headers.find(
          (e: MessagePayload) => e.name === query
        ).value
      }
      if (
        email.messages[email.messages.length - 1].payload.headers.find(
          (e: MessagePayload) =>
            e.name === `${query[0].toLowerCase() + query.slice(1)}`
        )
      ) {
        return email.messages[email.messages.length - 1].payload.headers.find(
          (e: MessagePayload) =>
            e.name === `${query[0].toLowerCase() + query.slice(1)}`
        ).value
      }
      return ''
    }
  }
  return ''
}

export default findPayloadHeadersData
