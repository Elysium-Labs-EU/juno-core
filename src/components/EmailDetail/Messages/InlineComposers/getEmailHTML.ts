import type getRelevantMessage from './getRelevantMessage'

export default function isBodyWithEmailHTML(
  relevantMessage: ReturnType<typeof getRelevantMessage>
) {
  if (relevantMessage && 'body' in relevantMessage.payload) {
    return 'emailHTML' in relevantMessage.payload.body
      ? relevantMessage.payload.body.emailHTML
      : undefined
  }
  return undefined
}
