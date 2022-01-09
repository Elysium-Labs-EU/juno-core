import { EmailListThreadItem } from '../Store/emailListTypes'

const undoubleThreads = (undoubleObject: EmailListThreadItem[]) => {
  if (undoubleObject && undoubleObject.length > 0) {
    return [
      ...new Set(undoubleObject.map((thread) => JSON.stringify(thread))),
    ].map((string) => JSON.parse(string))
  }
  return []
}

export default undoubleThreads
