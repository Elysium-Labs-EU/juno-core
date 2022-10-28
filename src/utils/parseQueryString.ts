/* eslint-disable no-restricted-syntax */

/**
 * @function parseQueryString
 * @param queryString - takes in the search query string from a window or document object
 * @returns an object with the query string parameters as keys and their values as values
 */

export default function parseQueryString(queryString: string) {
  const result: { [key: string]: string } = {}
  const searchParams = new URLSearchParams(queryString)
  for (const [key, value] of searchParams.entries()) {
    if (key !== null && value !== null) {
      result[key] = value
    }
  }
  return result
}
