/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function stringSimilarity(str1: string, str2: string): number {
  const len1 = str1.length
  const len2 = str2.length

  if (len1 === 0 || len2 === 0) {
    return len1 === 0 && len2 === 0 ? 1 : 0
  }

  let prevRow = new Array(len2 + 1).fill(0).map((_, index) => index)
  let curRow = new Array(len2 + 1).fill(0)

  for (let i = 1; i <= len1; i += 1) {
    curRow[0] = i

    for (let j = 1; j <= len2; j += 1) {
      if (str1[i - 1] === str2[j - 1]) {
        curRow[j] = prevRow[j - 1]
      } else {
        curRow[j] = Math.min(
          (prevRow[j - 1] || 0) + 1,
          curRow[j - 1] + 1,
          (prevRow[j] || 0) + 1
        )
      }
    }

    ;[prevRow, curRow] = [curRow, prevRow]
  }

  const distance = prevRow[len2]
  if (!distance) {
    return 0
  }
  const similarity = 1 - distance / Math.max(len1, len2)
  return similarity
}
