import getUserAgent from './getUserAgent'
import * as global from '../constants/globalConstants'

/**
 * Based on the user's user agent the variable modifier key is either KEY_OS or KEY_CONTROL.
 */

const modifierKey =
  getUserAgent() === global.MAC_OS ? global.KEY_OS : global.KEY_CONTROL

export default modifierKey
