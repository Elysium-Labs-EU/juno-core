import base64url from 'base64url'

/**
 * @function baseBase64
 * @param base64Data - encodes this string
 * @returns a base64 encoded string
 */

export function baseBase64(base64Data: string) {
  const b64 = base64url.toBase64(base64Data)
  return b64
}

/**
 * @function decodeBase64
 * @param base64Data - decodes this string, if it a valid string
 * @returns if the input is a valid string, it will return a decoded string, otherwise it returns null
 */

export function decodeBase64(base64Data: string) {
  if (base64Data !== undefined && base64Data !== 'undefined') {
    const checkedString = base64Data.replaceAll(/-/g, '+')
    const b64 = base64url.decode(checkedString)
    return b64
  }
  return undefined
}
