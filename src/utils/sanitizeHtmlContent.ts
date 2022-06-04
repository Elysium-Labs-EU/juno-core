export default function sanitizeHtmlContent(value: string) {
  return value.replace(/<[^>]*>/g, '')
}
