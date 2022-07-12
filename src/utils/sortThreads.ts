import { IEmailListThreadItem } from '../store/storeTypes/emailListTypes'

const sortThreads = (sortObject: IEmailListThreadItem[]) => {
  if (sortObject && sortObject.length > 0) {
    return sortObject.sort((a, b) => {
      if (a.messages && b.messages) {
        return (
          parseInt(b.messages[b.messages.length - 1].internalDate, 10) -
          parseInt(a.messages[a.messages.length - 1].internalDate, 10)
        )
      }
      if (a.message && b.messages) {
        return (
          parseInt(b.messages[b.messages.length - 1].internalDate, 10) -
          parseInt(a.message.internalDate, 10)
        )
      }
      if (a.messages && b.message) {
        return (
          parseInt(b.message.internalDate, 10) -
          parseInt(a.messages[a.messages.length - 1].internalDate, 10)
        )
      }
      if (a.message && b.message) {
        return (
          parseInt(b.message.internalDate, 10) -
          parseInt(a.message.internalDate, 10)
        )
      }
      return 0
    })
  }
  return []
}

export default sortThreads
