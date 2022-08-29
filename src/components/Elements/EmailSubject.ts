export default function emailSubject(subject: string): string {
  if (subject && subject.length > 0) {
    return subject
  }
  return '(no subject)'
}
