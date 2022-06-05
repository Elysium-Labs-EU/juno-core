const CHECK_WORDS = [
  'afmelden',
  'unsubscribe',
  'optout',
  'subscription',
  'uit te schrijven',
  'turn them off',
  'uitschrijven',
]
export default function fetchUnsubscribeLink({
  setUnsubscribeLink,
}: {
  setUnsubscribeLink: Function
}) {
  const elements = document.querySelectorAll('.visible a')
  const matchedElements: string[] = []
  if (elements.length > 0) {
    elements.forEach((element) => {
      const elementHref = element.getAttribute('href')
      if (
        elementHref &&
        new RegExp(CHECK_WORDS.join('|'), 'i').test(elementHref)
      ) {
        matchedElements.push(elementHref)
      }
      if (
        element.textContent &&
        new RegExp(CHECK_WORDS.join('|'), 'i').test(element.textContent) &&
        elementHref
      ) {
        matchedElements.push(elementHref)
      }
      if (
        element.className &&
        new RegExp(CHECK_WORDS.join('|'), 'i').test(element.className) &&
        elementHref
      ) {
        matchedElements.push(elementHref)
      }
      if (
        element?.parentElement?.innerText &&
        new RegExp(CHECK_WORDS.join('|'), 'i').test(
          element?.parentElement?.innerText
        ) &&
        elementHref
      ) {
        matchedElements.push(elementHref)
      }
      if (
        element?.parentElement?.previousSibling?.childNodes[0]?.textContent &&
        new RegExp(CHECK_WORDS.join('|'), 'i').test(
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
    setUnsubscribeLink(null)
  }
}
