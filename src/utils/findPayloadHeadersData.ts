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
    if (email.messages[0].internalDate) {
      if (
        email.messages[0].payload.headers.find(
          (e: MessagePayload) => e.name === query
        )
      ) {
        return email.messages[0].payload.headers.find(
          (e: MessagePayload) => e.name === query
        ).value
      }
      if (
        email.messages[0].payload.headers.find(
          (e: MessagePayload) =>
            e.name === `${query[0].toLowerCase() + query.slice(1)}`
        )
      ) {
        return email.messages[0].payload.headers.find(
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
