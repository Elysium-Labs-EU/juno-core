export default async function copyToClipboard(text: string | undefined) {
  try {
    if (!text) {
      throw new Error('Text to copy is undefined')
    }
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to copy text: ', err)
    return false
  }
}
