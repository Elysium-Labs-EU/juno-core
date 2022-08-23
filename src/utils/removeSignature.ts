import convertStringToHTML from './convertStringToHTML'

export default function removeSignature(emailBody: string) {
  const converted = convertStringToHTML(emailBody)
  converted.querySelectorAll('div').forEach((divSection) => {
    const junoSignature = divSection.getAttribute('data-juno')
    if (junoSignature && junoSignature.length > 0) {
      divSection.remove()
    }
  })
  return converted
}
