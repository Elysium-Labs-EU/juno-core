const SEPERATOR = 'utm'
const LIMIT = 1

export default function cleanLink() {
  const elements = document.querySelectorAll('a')
  if (elements.length > 0) {
    elements.forEach((element) => {
      const firstPartLink = element
        .getAttribute('href')
        ?.split(SEPERATOR, LIMIT)
      if (firstPartLink && firstPartLink.length > 0) {
        element.setAttribute('href', firstPartLink[0])
      }
    })
  }
}
