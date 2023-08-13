/**
 * @function deduplicateItems
 * @param undoubleObject - the threadlist item which contains double thread listings
 * @returns the threadlist object with single threads
 */

export default function deduplicateItems<T>(undoubleObject: T[]) {
  return [
    ...new Set(undoubleObject.map((item) => JSON.stringify(item))),
  ].reduce((acc, curr) => {
    const key = JSON.stringify(curr) as keyof T[]
    if (curr && !acc[key]) {
      acc.push(JSON.parse(curr) as T)
      return acc
    }
    return acc
  }, [] as T[])
}
