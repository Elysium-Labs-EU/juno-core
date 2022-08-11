// All the words that indicate an unsubscribe link. Expand the list if new matches need to be found.
const CHECK_WORDS = [
  'afmelden',
  'unsubscribe',
  'optout',
  'subscription',
  'uit te schrijven',
  'turn them off',
  'uitschrijven',
]

const REGEX = new RegExp(CHECK_WORDS.join('|'), 'i')

/**
 * @function fetchUnsubscribeLink
 * @param activeDocument
 * @param setUnsubscribeLink - takes in the setUnsubscribeLink function as callback
 * The function will attempt to match the regex with the found element. If there is a match, it will be pushed to the matchedElements array.
 * @returns {void}
 */
export default function fetchUnsubscribeLink(
  activeDocument: HTMLDivElement | null,
  setUnsubscribeLink: (value: string | null) => void
): void {
  const elements = activeDocument?.shadowRoot?.querySelectorAll('a')
  const matchedElements: string[] = []
  if (elements && elements.length > 0) {
    elements.forEach((element) => {
      const elementHref = element.getAttribute('href')
      if (elementHref && REGEX.test(elementHref)) {
        matchedElements.push(elementHref)
      }
      if (
        element.textContent &&
        REGEX.test(element.textContent) &&
        elementHref
      ) {
        matchedElements.push(elementHref)
      }
      if (element.className && REGEX.test(element.className) && elementHref) {
        matchedElements.push(elementHref)
      }
      if (
        element?.parentElement?.innerText &&
        REGEX.test(element?.parentElement?.innerText) &&
        elementHref
      ) {
        matchedElements.push(elementHref)
      }
      if (
        element?.parentElement?.previousSibling?.childNodes[0]?.textContent &&
        REGEX.test(
          element?.parentElement?.previousSibling?.childNodes[0]?.textContent
        ) &&
        elementHref
      ) {
        matchedElements.push(elementHref)
      }
    })
  }
  if (matchedElements.length > 0) {
    setUnsubscribeLink(matchedElements[matchedElements.length - 1])
  } else {
    // If there are no matched elements, set it to null. This is required to overwrite any previous data.
    setUnsubscribeLink(null)
  }
}
