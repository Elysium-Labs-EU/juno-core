const setCookie = (cName: string, cValue: {} | string, expDays: number) => {
  const date = new Date()
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${cName}=${JSON.stringify(
    cValue
  )}; ${expires}; path=/; SameSite=Lax`
}

export default setCookie
