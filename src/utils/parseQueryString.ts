/* eslint-disable no-restricted-syntax */

/**
 * @function parseQueryString
 * @param queryString - takes in the search query string from a window or document object
 * @param delimiter - optional - takes in a delimiter to split the query string by
 * @returns an object with the query string parameters as keys and their values as values
 */

export default function parseQueryString(
  queryString: string,
  delimiter?: string | RegExp | undefined
) {
  const result: { [key: string]: string } = {}
  if (delimiter) {
    const queryStringWithoutPlus = queryString.replace(/\+/g, ' ')
    const query = queryStringWithoutPlus.split(delimiter)
    for (const queryParam of query) {
      const [key, value] = queryParam.split('=')
      if (key !== undefined && value !== undefined) {
        result[key] = decodeURIComponent(value)
      }
    }
  } else {
    const searchParams = new URLSearchParams(queryString)
    for (const [key, value] of searchParams.entries()) {
      result[key] = value
    }
  }
  return result
}
