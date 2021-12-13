import { MessagePayload } from '../Store/draftsTypes'

const findPayloadHeadersData = (query: string, email: any) => {
  if (email && query) {
    if (email.internalDate) {
      return email.payload.headers.find((e: MessagePayload) => e.name === query)
        ? email.payload.headers.find((e: MessagePayload) => e.name === query)
            .value
        : email.payload.headers.find(
            (e: MessagePayload) =>
              e.name === `${query[0].toLowerCase() + query.slice(1)}`
          ).value
    }
  }
  return ''
}

export default findPayloadHeadersData
