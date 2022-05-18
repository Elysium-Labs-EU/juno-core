const handleClick = () => {
  console.log('click')
}

export default function handleEmailLink() {
  const elements = document.querySelectorAll('.visible a')
  if (elements.length > 0) {
    elements.forEach((element) => {
      if (element.getAttribute('href')?.includes('mailto:')) {
        const mailToLink = element.getAttribute('href')
        if (mailToLink) {
          element.removeAttribute('href')
          element.addEventListener('click', handleClick)
          console.log(element)
          return element
        }
      }
      return element
    })
  }
}
