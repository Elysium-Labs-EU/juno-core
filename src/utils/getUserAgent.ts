/**
 * @function getUserAgent
 * Checks the navigator on the userAgent strin
 * @returns a matched result based on the detected userAgent string, MacOS is the default fallback.
 */

import { OPERATING_SYSTEMS } from 'constants/globalConstants'

export default function getUserAgent() {
  if (typeof navigator !== 'undefined') {
    const value = navigator.userAgent
    if (value) {
      if (value.indexOf('Win') !== -1) {
        return OPERATING_SYSTEMS.WINDOWS_OS
      }
      if (value.indexOf('Mac') !== -1) {
        return OPERATING_SYSTEMS.MAC_OS
      }
      if (value.indexOf('X11') !== -1) {
        return OPERATING_SYSTEMS.UNIX_OS
      }
      if (value.indexOf('Linux') !== -1) {
        return OPERATING_SYSTEMS.LINUX_OS
      }
    }
  }
  // MacOS is the preferred OS :) .
  return OPERATING_SYSTEMS.MAC_OS
}
