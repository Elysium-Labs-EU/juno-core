// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// eslint-disable-next-line import/no-extraneous-dependencies
const { shell } = require('electron')

const isValidHttpUrl = (checkString) => {
  let url
  try {
    url = new URL(checkString)
  } catch (_) {
    return false
  }

  return (
    url.protocol === 'http:' ||
    url.protocol === 'https:' ||
    url.protocol === 'mailto:'
  )
}

window.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    if (
      event.target.tagName.toLowerCase() === 'a' &&
      event.target.protocol !== 'file:'
    ) {
      event.preventDefault()
      if (isValidHttpUrl(event.target.href)) {
        shell.openExternal(event.target.href)
      }
    } else if (
      event.target.parentNode.tagName.toLowerCase() === 'a' &&
      event.target.parentNode.protocol !== 'file:'
    ) {
      event.preventDefault()
      if (isValidHttpUrl(event.target.parentNode.href)) {
        shell.openExternal(event.target.parentNode.href)
      }
    }
  })
})
