export default function isPromise(promise: unknown): promise is Promise<unknown> {
  return !!promise && promise instanceof Function && 'then' in promise && typeof promise.then === 'function'
}
