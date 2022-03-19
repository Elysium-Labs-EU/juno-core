export default function isPromise(promise: any) {
  return !!promise && typeof promise.then === 'function'
}
