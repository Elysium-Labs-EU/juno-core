/**
 * @function deduplicateItems
 * @param undoubleObject - the threadlist item which contains double thread listings
 * @returns the threadlist object with single threads
 */

export default function deduplicateItems<T>(undoubleObject: T[]) {
  if (undoubleObject && undoubleObject.length > 0) {
    return [...new Set(undoubleObject.map((item) => JSON.stringify(item)))].map(
      (string) => {
        if (string) {
          return JSON.parse(string)
        }
        return undefined
      }
    )
  }
  return []
}
