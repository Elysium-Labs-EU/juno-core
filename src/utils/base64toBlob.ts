import baseBase64 from './decodeBase64'

export default function base64toBlob({
  base64Data,
  mimeType,
}: {
  base64Data: string
  mimeType: string
}) {
  const sliceSize = 1024
  const byteCharacters = atob(baseBase64(base64Data))
  const bytesLength = byteCharacters.length
  const slicesCount = Math.ceil(bytesLength / sliceSize)
  const byteArrays = new Array(slicesCount)

  for (let sliceIndex = 0; sliceIndex < slicesCount; sliceIndex += 1) {
    const begin = sliceIndex * sliceSize
    const end = Math.min(begin + sliceSize, bytesLength)

    const bytes = new Array(end - begin)
    for (let offset = begin, i = 0; offset < end; i += 1, offset += 1) {
      const byte = byteCharacters[offset]
      if (byte) {
        bytes[i] = byte.charCodeAt(0)
      }
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes)
  }
  return new Blob(byteArrays, { type: mimeType })
}
