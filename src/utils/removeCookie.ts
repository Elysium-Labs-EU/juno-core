const removeCookie = (cName: string) => {
  const expires = `expires = Thu, 01 Jan 1970 00:00:00 UTC8 `
  document.cookie = `${cName}=; ${expires}; path=/`
}

export default removeCookie
