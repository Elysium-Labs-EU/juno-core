import base64url from 'base64url'

/**
 * @function baseBase64
 * @param base64Data - encodes this string
 * @returns a base64 encoded string
 */

export default function baseBase64(base64Data: string) {
  const b64 = base64url.toBase64(base64Data)
  return b64
}
