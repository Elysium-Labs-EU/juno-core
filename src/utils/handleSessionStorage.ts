export default function handleSessionStorage(name: string, value?: string) {
  try {
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
  } catch (err) {
    return err
  }
}
