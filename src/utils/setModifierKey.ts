import getUserAgent from './getUserAgent'
import * as global from '../constants/globalConstants'

/**
 * @function modifierKeyDisplay
 * @returns Based on the user's user agent the variable modifier key is either CMD or KEY_CONTROL
 */

export const modifierKeyDisplay =
  getUserAgent() === global.MAC_OS ? 'CMD' : global.KEY_CONTROL

/**
 * @function setModifierKey
 * @returns Based on the user's user agent the variable modifier key is either KEY_OS or KEY_CONTROL.
 */
export const setModifierKey =
  getUserAgent() === global.MAC_OS ? global.KEY_OS : global.KEY_CONTROL
