import base64url from 'base64url'

const decodeBase64 = (base64Data) => {
  const b64 = base64url.toBase64(base64Data)
  return b64
}

export default decodeBase64
