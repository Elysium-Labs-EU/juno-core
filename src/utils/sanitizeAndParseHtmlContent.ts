import ReactHtmlParser from 'react-html-parser'
import DOMPurify from 'dompurify'

export default function sanitizeAndParseHtmlContent(value: string) {
  const sanitizedData = DOMPurify.sanitize(value, {
    USE_PROFILES: { html: true },
  })
  return ReactHtmlParser(sanitizedData)
}
