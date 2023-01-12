import * as global from 'constants/globalConstants'
import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'

/**
 * @function sortThreads
 * @param sortObject the object to sort
 * @param forceSort a optional flag to overwrite the filtering on draft, if false it will filter out drafts from the sort
 * @returns a sorted array or empty arry
 */

export default function sortThreads(
  sortObject: Array<IEmailListThreadItem>,
  forceSort?: boolean
) {
  if (sortObject && sortObject.length > 0) {
    return sortObject.sort((a, b) => {
      if (a.messages && b.messages) {
        const firstMessages =
          a.messages[
            forceSort
              ? a.messages.length - 1
              : a.messages.filter(
                  (message) =>
                    message.labelIds.indexOf(global.DRAFT_LABEL) === -1
                ).length - 1
          ]
        const secondMessages =
          b.messages[
            forceSort
              ? b.messages.length - 1
              : b.messages.filter(
                  (message) =>
                    message.labelIds.indexOf(global.DRAFT_LABEL) === -1
                ).length - 1
          ]
        if (firstMessages && secondMessages) {
          return (
            parseInt(secondMessages?.internalDate, 10) -
            parseInt(firstMessages?.internalDate, 10)
          )
        }
      }
      return 0
    })
  }
  return []
}
