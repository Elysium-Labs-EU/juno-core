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
      if (elementHref?.includes('unsubscribe')) {
        matchedElements.push(elementHref)
      }
      if (element.textContent?.includes('nsubscribe') && elementHref) {
        matchedElements.push(elementHref)
      }
      if (element.className?.includes('nsubscribe') && elementHref) {
        matchedElements.push(elementHref)
      }
    })
  }
  if (matchedElements.length > 0) {
    setUnsubscribeLink(matchedElements[0])
  } else {
    setUnsubscribeLink(null)
  }
}
