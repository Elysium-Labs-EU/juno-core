import { MessagePayload } from '../Store/draftsTypes'

const findPayloadHeadersData = (query: string, email: any) => {
  //   const { query, email, threadDetail } = props
  //   console.log(email)
  if (email && query) {
    if (email.messages) {
      return email.messages[0].payload.headers.find(
        (data: MessagePayload) => data.name === query
      )
        ? email.messages[0].payload.headers.find(
            (data: MessagePayload) => data.name === query
          ).value
        : ''
    }
    if (email.message) {
      return email.message.payload.headers.find(
        (data: MessagePayload) => data.name === query
      )
        ? email.message.payload.headers.find(
            (data: MessagePayload) => data.name === query
          ).value
        : ''
    }
    // Temp solution for separate email
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

  //   if (threadDetail && threadDetail.messages) {
  //     return threadDetail.messages[0].payload.headers.find(
  //       (data: MessagePayload) => data.name === query
  //     )
  //       ? threadDetail.messages[0].payload.headers.find(
  //           (data: MessagePayload) => data.name === query
  //         ).value
  //       : undefined
  //   }
  return ''
}

export default findPayloadHeadersData
