/**
 * Recursively compares the properties of two objects to determine if they are equal.
 *
 * @param {Object} obj1 - The first object to compare.
 * @param {Object} obj2 - The second object to compare.
 * @returns {boolean} - Returns true if the objects are equal, false otherwise.
 */

/* eslint-disable no-restricted-syntax */
export default function isEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true
  }

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false
    }

    if (!isEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}
