import * as global from '../constants/globalConstants'

/**
 * @function getUserAgent
 * Checks the navigator on the userAgent strin
 * @returns a matched result based on the detected userAgent string, MacOS is the default fallback.
 */

export default function getUserAgent() {
  const value = navigator.userAgent
  if (value) {
    if (value.indexOf('Win') !== -1) {
      return global.WINDOWS_OS
    }
    if (value.indexOf('Mac') !== -1) {
      return global.MAC_OS
    }
    if (value.indexOf('X11') !== -1) {
      return global.UNIX_OS
    }
    if (value.indexOf('Linux') !== -1) {
      return global.LINUX_OS
    }
  }
  // MacOS is the preferred OS :) .
  return 'MacOS'
}
