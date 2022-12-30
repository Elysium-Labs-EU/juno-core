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
        return (
          parseInt(
            b.messages[
              forceSort
                ? b.messages.length - 1
                : b.messages.filter(
                    (message) =>
                      !message?.labelIds?.includes(global.DRAFT_LABEL)
                  ).length - 1
            ]?.internalDate,
            10
          ) -
          parseInt(
            a.messages[
              forceSort
                ? a.messages.length - 1
                : a.messages.filter(
                    (message) =>
                      !message?.labelIds?.includes(global.DRAFT_LABEL)
                  ).length - 1
            ]?.internalDate,
            10
          )
        )
      }
      return 0
    })
  }
  return []
}
