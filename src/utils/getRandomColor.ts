/* eslint-disable no-bitwise */
const getRandomColor = (senderName: string) => {
  // get first alphabet in upper case
  const firstAlphabet = senderName.charAt(0).toLowerCase()

  // get the ASCII code of the character
  const asciiCode = firstAlphabet.charCodeAt(0)

  // number that contains 3 times ASCII value of character -- unique for every alphabet
  const colorNum =
    asciiCode.toString() + asciiCode.toString() + asciiCode.toString()

  const num = Math.round(0xffffff * parseInt(colorNum, 12))
  const r = (num >> 16) & 255
  const g = (num >> 8) & 100
  const b = num & 255

  return `rgb(${r}, ${g}, ${b}, 0.4)`
}

export default getRandomColor
