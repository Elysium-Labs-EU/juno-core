import convertStringToHTML from './convertStringToHTML'

// TODO: Improve by looking at inline styles as well
const TRACKERS_SELECTORS = [
  { attribute: 'width', value: '0' },
  { attribute: 'width', value: '1' },
  { attribute: 'height', value: '0' },
  { attribute: 'height', value: '1' },
]
const TRACKERS_SELECTORS_INCLUDES = [
  { attribute: 'src', value: 'http://mailstat.us' },
  { attribute: 'src', value: 'https://open.convertkit-' },
]

export default function removeTrackers(orderedObject: {
  emailHTML: string
  emailFileHTML: any[]
}) {
  const localCopyOrderedObject: {
    emailHTML: string | HTMLElement
    emailFileHTML: any[]
    removedTrackers: boolean
  } = { ...orderedObject, removedTrackers: false }

  const converted = convertStringToHTML(orderedObject.emailHTML)
  converted.querySelectorAll('img').forEach((foundImage) => {
    if (
      TRACKERS_SELECTORS.some(
        (checkValue) =>
          foundImage.getAttribute(checkValue.attribute) === checkValue.value
      ) ||
      TRACKERS_SELECTORS_INCLUDES.some((checkValueInclude) =>
        foundImage
          .getAttribute(checkValueInclude.attribute)
          ?.includes(checkValueInclude.value)
      )
    ) {
      foundImage.remove()
      localCopyOrderedObject.removedTrackers = true
    }
  })
  localCopyOrderedObject.emailHTML = converted
  return localCopyOrderedObject
}
