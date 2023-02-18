export default async function copyToClipboard(text: string | undefined) {
  try {
    if (!text) {
      throw new Error('Text to copy is undefined')
    }
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}
