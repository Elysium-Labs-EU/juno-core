export default function getEmailSubject(subject: string | null): string {
  if (subject && subject.length > 0) {
    return subject
  }
  return '(no subject)'
}
