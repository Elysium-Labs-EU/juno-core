/**
 * @function openLinkInNewTab
 * Hooks into the document and fetches all the elements that are 'a' elements.
 * And adds the target attribute '_blank' to the element if it is not an mail link.
 * @returns {void}
 */

export default function openLinkInNewTab(): void {
  const elements = document.querySelectorAll('a')
  if (elements.length > 0) {
    elements.forEach((element) => {
      if (element.getAttribute('href')?.includes('mailto:')) {
        return element
      }
      return element.setAttribute('target', '_blank')
    })
  }
}
