/**
 * @function convertStringToHTML
 * @param str - takes in a string
 * @returns a HTMLElement, converted from the string.
 */

export default function convertStringToHTML(str: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, 'text/html')
  return doc.body
}
