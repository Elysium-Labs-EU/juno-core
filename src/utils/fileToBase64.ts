import base64url from 'base64url'

/**
 * @function baseBase64
 * @param base64Data - encodes this string
 * @returns a base64 encoded string
 */

// Buffer.from(file, 'base64')

export default function fileToBase64(file: File): Promise<string | undefined> {
  // const b64 = await file.arrayBuffer()
  // console.log(b64)
  // const reader = new FileReader()
  // const b64 = reader.readAsDataURL(file)
  // console.log(b64)
  // const b64 = await FileReader.readAsDataURL()
  // const reader = new FileReader()

  // reader.onload = () => {
  //   // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
  //   const b64 = reader?.result?.toString().replace(/^data:.+;base64,/, '')
  //   console.log('BOOM', b64) // -> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
  // }
  // reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(
        reader?.result
          ? reader?.result?.toString().replace(/^data:.+;base64,/, '')
          : undefined
      )
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  // return b64
}
