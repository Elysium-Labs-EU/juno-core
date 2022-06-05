export default function handleSessionStorage(name: string, value?: string) {
  const data = sessionStorage.getItem(name)
  if (data) {
    if (value) {
      sessionStorage.setItem(name, value)
    }
    return data
  }
  if (value) {
    sessionStorage.setItem(name, value)
    return value
  }
  return ''
}
