import DOMPurify from 'dompurify'
import ReactHtmlParser from 'react-html-parser'

export default function sanitizeAndParseHtmlContent(value: string) {
  const sanitizedData = DOMPurify.sanitize(value, {
    USE_PROFILES: { html: true },
  })
  return ReactHtmlParser(sanitizedData)
}
