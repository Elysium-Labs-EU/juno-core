import { FiArrowDown, FiArrowUp } from 'react-icons/fi'
import getUserAgent from '../utils/getUserAgent'
import * as global from './globalConstants'

export const MODAL_TITLE = 'Keyboard Combos'
export const MODAL_OS_SUB =
  'Your keyboard combos have been set based on the detected platform:'

export const GLOBAL_KEY_TITLE = 'Global'
export const GLOBAL_KEY_SUB_TITLE = 'Use these shortcuts to navigate.'

const modifierKey =
  getUserAgent() === global.MAC_OS ? 'CMD' : global.KEY_CONTROL

export const GLOBAL_KEY_COMBOS = [
  { title: "Open Todo's", keys: ['1'] },
  { title: 'Open Inbox', keys: ['2'] },
  { title: 'Open Search', keys: ['3'] },
  { title: 'Open Compose', keys: ['4'] },
  { title: 'Open Help', keys: [modifierKey, '/'] },
  { title: 'Focus Mode / Sort Inbox', keys: [modifierKey, 'E'] },
  { title: 'Close Window / Back', keys: ['ESCAPE'] },
  { title: 'Highlight Previous', keys: [<FiArrowUp />] },
  { title: 'Highlight Next', keys: [<FiArrowDown />] },
  { title: 'Open Highlighted Email', keys: ['ENTER'] },
]

export const EMAIL_KEY_TITLE = 'Email'
export const EMAIL_KEY_SUB_TITLE =
  'These shortcuts are available when you are on the email details page.'

export const EMAIL_DETAIL_COMBOS = [
  { title: 'Mark Email as To Do', keys: [modifierKey, 'E'] },
  { title: 'Archive Email', keys: [modifierKey, 'BACKSPACE'] },
  {
    title: 'Delete Email (when no Archive Email)',
    keys: [modifierKey, 'BACKSPACE'],
  },
  { title: 'Reply to Email', keys: ['ENTER'] },
  { title: 'Forward Email', keys: ['SHIFT', 'ENTER'] },
  { title: 'Skip Email', keys: [modifierKey, 'SHIFT', 'K'] },
]

export const COMPOSE_KEY_TITLE = 'Compose'
export const COMPOSE_KEY_SUB_TITLE = 'Use these shortcuts when composing.'

export const COMPOSE_KEY_COMBOS = [
  { title: 'Send Email', keys: [modifierKey, 'ENTER'] },
]
