// import chunk from 'lodash/chunk'
// import { UpdateEmailListLabel } from '../Store/emailListSlice'
// import { EmailMessage } from '../Store/emailListTypes'

// const MAX_CHUNK_SIZE = 10

// const MarkEmailAsRead = ({
//   dispatch,
//   labelIds,
//   unreadMessageFeed,
// }: {
//   dispatch: any
//   labelIds: string[]
//   unreadMessageFeed: any
// }) => {
//   if (unreadMessageFeed.length > 0 && dispatch) {
//     const request = {
//       removeLabelIds: ['UNREAD'],
//     }
//     const arrayChunks: EmailMessage[][] = chunk(
//       unreadMessageFeed,
//       MAX_CHUNK_SIZE
//     )
//     // Throttle the number of requests
//     // arrayChunks.forEach((arrayChunk, index) => {
//     //   const idArray = arrayChunk.map((item) => item.id)
//     // setTimeout(() => {
//     //   idArray.length > 0 &&
//     //     idArray.forEach((messageId) => {
//     //       dispatch(
//     //         UpdateEmailListLabel({
//     //           messageId,
//     //           request,
//     //           labelIds,
//     //         })
//     //       )
//     //     })
//     // }, 2000 * index)
//     // })
//   }
// }

// export default MarkEmailAsRead

export {}
