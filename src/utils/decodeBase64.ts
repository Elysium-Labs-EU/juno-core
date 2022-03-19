import base64url from 'base64url'

export const baseBase64 = (base64Data: string) => {
  const b64 = base64url.toBase64(base64Data)
  return b64
}

export const decodeBase64 = (base64Data: string) => {
  // if (base64Data === undefined) console.trace(base64Data)
  if (base64Data !== undefined && base64Data !== 'undefined') {
    const checkedString = base64Data.replaceAll(/-/g, '+')
    const b64 = base64url.decode(checkedString)
    return b64
  }
  return null
}
