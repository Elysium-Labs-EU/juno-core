import { expect } from 'vitest'

import isEqual from '../isEqual'

describe('isEqual function', () => {
  it('should return true when comparing two equal objects', () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } }
    const obj2 = { a: 1, b: 2, c: { d: 3 } }
    expect(isEqual(obj1, obj2)).toBe(true)
  })

  it('should return false when comparing two different objects', () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } }
    const obj2 = { a: 1, b: 2, c: { d: 4 } }
    expect(isEqual(obj1, obj2)).toBe(false)
  })

  it('should return false when comparing an object with a primitive', () => {
    const obj1 = { a: 1, b: 2, c: { d: 3 } }
    const obj2 = 3
    expect(isEqual(obj1, obj2)).toBe(false)
  })

  it('should return true when comparing two empty objects', () => {
    const obj1 = {}
    const obj2 = {}
    expect(isEqual(obj1, obj2)).toBe(true)
  })
})
