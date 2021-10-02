import { EmailListThreadItem } from '../Store/emailListTypes'

const sortThreads = (sortObject: EmailListThreadItem[]) => {
  if (sortObject && sortObject.length > 0) {
    return sortObject.sort((a: EmailListThreadItem, b: EmailListThreadItem) => {
      if (a.messages && b.messages) {
        return ((parseInt(
          b.messages[b.messages.length - 1].internalDate,
          10
        ) as any) -
          parseInt(a.messages[a.messages.length - 1].internalDate, 10)) as any
      }
      return sortObject
    })
  }
  return null
}

export default sortThreads
