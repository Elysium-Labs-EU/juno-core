export default function openLinkInNewTab() {
  const elements = document.querySelectorAll('.visible a')
  if (elements.length > 0) {
    elements.forEach((element) => element.setAttribute('target', '_blank'))
  }
}
