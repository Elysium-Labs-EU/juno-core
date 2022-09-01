import getUserAgent from './getUserAgent'
import * as global from '../constants/globalConstants'
import * as keyConstant from '../constants/keyConstants'

/**
 * @function modifierKeyDisplay
 * @returns Based on the user's user agent the variable modifier key is either CMD or KEY_CONTROL
 */

export const modifierKeyDisplay =
  getUserAgent() === global.MAC_OS ? '⌘' : keyConstant.KEY_CONTROL

/**
 * @function setModifierKey
 * @returns Based on the user's user agent the variable modifier key is either KEY_OS or KEY_CONTROL.
 */
export const setModifierKey =
  getUserAgent() === global.MAC_OS
    ? keyConstant.KEY_OS
    : keyConstant.KEY_CONTROL
