export default function openLinkInNewTab() {
  const elements = document.querySelectorAll('.visible a')
  if (elements.length > 0) {
    elements.forEach((element) => {
      if (element.getAttribute('href')?.includes('mailto:')) {
        return element
      }
      return element.setAttribute('target', '_blank')
    })
  }
}
