/**
 * @function deduplicateItems
 * @param undoubleObject - the threadlist item which contains double thread listings
 * @returns the threadlist object with single threads
 */

export default function deduplicateItems<T>(undoubleObject: T[]): T[] {
  if (undoubleObject.length > 0) {
    return [...new Set(undoubleObject.map((item) => JSON.stringify(item)))].map(
      (string) => {
        if (string) {
          return JSON.parse(string) as T
        }
        return undefined
      }
    ).filter((item): item is T => item !== undefined)
  }
  return []
}

