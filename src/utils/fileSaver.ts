/**
 * Downloads a blob as a file in the browser.
 * @param {Object} options - The options for the download.
 * @param {Blob} options.blob - The blob to download.
 * @param {string} options.fileName - The name of the file to save the blob as.
 */

export default function downloadBlob({
  blob,
  fileName,
}: {
  blob: Blob
  fileName: string
}) {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}
