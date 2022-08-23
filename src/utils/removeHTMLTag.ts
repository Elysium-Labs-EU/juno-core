export default function removeHTMLTag(value: string) {
  return value.replace(/<[^>]*>/g, '')
}
