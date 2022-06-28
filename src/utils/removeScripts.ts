export default function removeScripts(orderedObject: {
  emailHTML: HTMLElement
  emailFileHTML: any[]
}) {
  orderedObject.emailHTML.querySelectorAll('script').forEach((foundScript) => {
    foundScript.remove()
  })
  return orderedObject
}
