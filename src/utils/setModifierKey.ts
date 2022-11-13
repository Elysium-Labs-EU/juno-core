import * as global from 'constants/globalConstants'
import * as keyConstant from 'constants/keyConstants'
import getUserAgent from 'utils/getUserAgent'

/**
 * @function modifierKeyDisplay
 * @returns Based on the user's user agent the variable modifier key is either CMD or KEY_SPECIAL.control
 */

export const modifierKeyDisplay =
  getUserAgent() === global.MAC_OS ? '⌘' : keyConstant.KEY_SPECIAL.control

/**
 * @function setModifierKey
 * @returns Based on the user's user agent the variable modifier key is either KEY_SPECIAL.os or KEY_SPECIAL.control.
 */
export const setModifierKey =
  getUserAgent() === global.MAC_OS
    ? keyConstant.KEY_SPECIAL.os
    : keyConstant.KEY_SPECIAL.control
