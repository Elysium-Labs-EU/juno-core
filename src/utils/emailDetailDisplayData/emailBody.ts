/**
 * @function emailBody
 * @param body - takes in the complete body of the email
 * @returns the selected message's body or undefined.
 */
const emailBody = (body: string, isForwarding?: boolean) => {
  if (body) {
    if (isForwarding) {
      const FORWARD_LABEL =
        '<p></p><p></p><p>---------- Forwarded message --------</p>'
      // Add the Forwarded message label
      return `${FORWARD_LABEL}${body}`
    }
    return body
  }
  return undefined
}

export default emailBody
