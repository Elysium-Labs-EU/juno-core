const convertArrayToString = (data: string | string[]) => {
  console.log(data)
  if (data && typeof data === 'string' && data.length > 0) {
    const converted = data.toString().replace(',', '-')
    return converted
  }
  if (data && Array.isArray(data) && data.length > 0) {
    const converted = data[0].toString().replace(',', '-')
    return converted
  }
  return ''
}

export default convertArrayToString
