import convertStringToHTML from './convertStringToHTML'

const TRACKERS_SELECTORS = [
  { attribute: 'width', value: '0' },
  { attribute: 'width', value: '0 !important' },
  { attribute: 'width', value: '1' },
  { attribute: 'width', value: '1 !important' },
  { attribute: 'height', value: '0' },
  { attribute: 'height', value: '0 !important' },
  { attribute: 'height', value: '1' },
  { attribute: 'height', value: '1 !important' },
  { attribute: 'display', value: 'none' },
  { attribute: 'display', value: 'none !important' },
]
const TRACKERS_SELECTORS_INCLUDES = [
  { attribute: 'src', value: 'http://mailstat.us' },
  { attribute: 'src', value: 'https://open.convertkit-' },
]

function parseStyleIntoObject(documentImage: HTMLImageElement) {
  const parsedStyle =
    documentImage.getAttribute('style')?.split(/\s*;\s*/g) ?? []
  let foundImage: any = null
  for (let i = 0; parsedStyle.length > i; i += 1) {
    if (parsedStyle[i]) {
      const parts = parsedStyle[i].match(/^([^:]+)\s*:\s*(.+)/)
      if (
        parts &&
        TRACKERS_SELECTORS.some(
          (checkValue) => parts[1] === checkValue.attribute
        ) &&
        TRACKERS_SELECTORS.some((checkValue) => parts[2] === checkValue.value)
      ) {
        foundImage = documentImage
        break
      }
    }
  }
  return foundImage
}

function detectAndRemove(documentImage: HTMLElement) {
  // process.env.NODE_ENV !== 'production' && console.log(foundImage)
  let foundImage: any = null
  if (
    TRACKERS_SELECTORS.some(
      (checkValue) =>
        documentImage.getAttribute(checkValue.attribute) === checkValue.value
    ) ||
    TRACKERS_SELECTORS_INCLUDES.some((checkValueInclude) =>
      documentImage
        .getAttribute(checkValueInclude.attribute)
        ?.includes(checkValueInclude.value)
    )
  ) {
    foundImage = documentImage
  }
  return foundImage
}

export default function removeTrackers(orderedObject: {
  emailHTML: string
  emailFileHTML: any[]
}) {
  const localCopyOrderedObject: {
    emailHTML: string | HTMLElement
    emailFileHTML: any[]
    removedTrackers: Attr[]
  } = { ...orderedObject, removedTrackers: [] }

  const converted = convertStringToHTML(orderedObject.emailHTML)
  let foundImage: null | HTMLElement = null
  converted.querySelectorAll('img').forEach((documentImage) => {
    const imageWithInlineSrc = documentImage.getAttribute('style')
    if (imageWithInlineSrc !== null) {
      const response = parseStyleIntoObject(documentImage)
      if (response) {
        foundImage = response
      }
    }
    const response = detectAndRemove(documentImage)
    if (response) {
      foundImage = response
    }
    if (foundImage) {
      foundImage.remove()
      const srcOfTracker = documentImage?.attributes?.getNamedItem('src')
      if (srcOfTracker) {
        localCopyOrderedObject.removedTrackers.push(srcOfTracker)
      }
    }
  })
  localCopyOrderedObject.emailHTML = converted
  return localCopyOrderedObject
}
