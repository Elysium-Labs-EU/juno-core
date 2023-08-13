/**
 * @function multipleIncludes
 * @param {Array} first - an array of any type
 * @param {Array} second - an array of any type
 * @returns {boolean} true if all elements of the first array are included in the second array, false otherwise.
 */

const multipleIncludes = (
  first: Array<unknown>,
  second: Array<unknown>
): boolean => {
  const secondSet = new Set(second)
  return first.every((el) => secondSet.has(el))
}

export default multipleIncludes
