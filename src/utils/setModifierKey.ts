import getUserAgent from './getUserAgent'
import * as global from '../constants/globalConstants'

const modifierKey =
  getUserAgent() === global.MAC_OS ? global.KEY_OS : global.KEY_CONTROL

export default modifierKey
