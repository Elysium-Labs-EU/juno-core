/**
 * getLuminance - calculate the luminance of a color
 * @param {number} r - red value of the color (0-255)
 * @param {number} g - green value of the color (0-255)
 * @param {number} b - blue value of the color (0-255)
 * @returns {number} luminance - the luminance value of the color (0-1)
 */

export default function getLuminance(backgroundColor: string) {
  const colorMap = backgroundColor?.match(/\d+/g)?.map((c) => parseInt(c, 10))
  if (colorMap) {
    const [r, g, b] = colorMap

    const a = [r, g, b].map((c) => {
      let tempC = c
      if (tempC) {
        tempC /= 255
        return tempC <= 0.03928
          ? tempC / 12.92
          : ((tempC + 0.055) / 1.055) ** 2.4
      }
      return tempC
    })
    if (a.every((i) => typeof i === 'number')) {
      if (a[0] && a[1] && a[2]) {
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
      }
    }
  }
  return null
}
