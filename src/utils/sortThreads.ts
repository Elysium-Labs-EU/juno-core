import { EmailListThreadItem } from '../Store/emailListTypes'

const sortThreads = (sortObject: any) => {
  if (sortObject && sortObject.threads.length > 0) {
    return sortObject.threads.sort(
      (a: EmailListThreadItem, b: EmailListThreadItem) => {
        if (a.messages && b.messages) {
          return (
            parseInt(b.messages[b.messages.length - 1].internalDate, 10) -
            parseInt(a.messages[a.messages.length - 1].internalDate, 10)
          )
        }
        return sortObject.threads
      }
    )
  }
  return null
}

export default sortThreads
