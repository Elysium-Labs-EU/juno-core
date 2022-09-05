import { IEmailListThreadItem } from '../store/storeTypes/emailListTypes'

/**
 * @function undoubleThreads
 * @param undoubleObject - the threadlist item which contains double thread listings
 * @returns the threadlist object with single threads
 */

export default function undoubleThreads(
  undoubleObject: IEmailListThreadItem[]
) {
  if (undoubleObject && undoubleObject.length > 0) {
    return [
      ...new Set(undoubleObject.map((thread) => JSON.stringify(thread))),
    ].map((string) => JSON.parse(string))
  }
  return []
}
