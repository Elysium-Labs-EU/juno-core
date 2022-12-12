const isSymbol = (value: any): value is symbol =>
  !!value && value.constructor === Symbol

const isFunction = (value: any): value is Function =>
  !!(value && value.constructor && value.call && value.apply)

const isDate = (value: any): value is Date =>
  Object.prototype.toString.call(value) === '[object Date]'

const isNumber = (value: any): value is number => {
  try {
    return Number(value) === value
  } catch {
    return false
  }
}

/**
 * @function isEmpty
 * @param value - any value to check if it is empty
 * @description based on https://github.com/rayepps/radash/blob/master/src/typed.ts
 * @returns boolean - true if empty, false if not
 */

export default function isEmpty(value: any) {
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true
  if (Number(value)) return value === 0
  if (isDate(value)) return Number.isNaN(value.getTime())
  if (isFunction(value)) return false
  if (isSymbol(value)) return false
  const { length } = value as any
  if (isNumber(length)) return length === 0
  const { size } = value as any
  if (isNumber(size)) return size === 0
  const keys = Object.keys(value).length
  return keys === 0
}
