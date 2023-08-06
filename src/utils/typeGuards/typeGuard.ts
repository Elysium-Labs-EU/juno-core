type TypeGuard<T> = (val: unknown) => T

export const string: TypeGuard<string> = (val: unknown) => {
  if (typeof val !== 'string') {
    throw new Error('Not a string')
  }
  return val
}

export const number: TypeGuard<number> = (val: unknown) => {
  if (typeof val !== 'number') {
    throw new Error('Not a number')
  }
  return val
}

export const boolean: TypeGuard<boolean> = (val: unknown) => {
  if (typeof val !== 'boolean') {
    throw new Error('Not a boolean')
  }
  return val
}

export const object: TypeGuard<object> = (val: unknown) => {
  if (typeof val !== 'object' || val === null) {
    throw new Error('Not an object')
  }
  return val
}

export const array = <T>(inner: TypeGuard<T>) => (val: unknown): T[] => {
  if (!Array.isArray(val)) {
    throw new Error('Not an array')
  }
  return val.map(inner)
}

export const objectOf = <T extends Record<string, TypeGuard<any>>>(inner: T) => {
  return (val: unknown): { [K in keyof T]: ReturnType<T[K]> } => {
    const valAsObject = object(val)
    const out: { [P in keyof T]: ReturnType<T[P]> } = {} as any
    for (const key in inner) {
      const innerTypeGuard = inner[key]
      if (innerTypeGuard) {
        out[key] = innerTypeGuard((valAsObject as any)[key])
      }
    }
    return out
  }
}
