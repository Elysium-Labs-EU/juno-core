export default function isPromise(promise: unknown) {
  return !!promise && promise instanceof Function && 'then' in promise && typeof promise.then === 'function'
}
