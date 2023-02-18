import * as global from 'constants/globalConstants'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'

/**
 * @function sortThreads
 * @param sortObject the object to sort
 * @param forceSort a optional flag to overwrite the filtering on draft, if false it will filter out drafts from the sort
 * @returns a sorted array or empty arry
 */

export default function sortThreads(
  sortObject: Array<TThreadObject>,
  forceSort?: boolean
) {
  if (!sortObject || sortObject.length === 0) {
    return []
  }
  const mappedArray = sortObject.map((thread) => {
    let { messages } = thread
    if (!forceSort) {
      messages = messages.filter(
        (message) => message.labelIds.indexOf(global.DRAFT_LABEL) === -1
      )
    }
    return {
      thread,
      internalDate: messages[messages.length - 1]?.internalDate,
    }
  })

  return mappedArray
    .sort((a, b) => Number(b?.internalDate) - Number(a?.internalDate))
    .map((item) => item.thread)
}
