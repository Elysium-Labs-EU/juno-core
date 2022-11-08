import { modifierKeyDisplay } from '../utils/setModifierKey'

export const MODAL_TITLE = 'Keyboard Combos'
export const MODAL_OS_SUB =
  'Your keyboard combos have been set based on the detected platform:'

export const GLOBAL_KEY_TITLE = 'Global'
export const GLOBAL_KEY_SUB_TITLE = 'Use these shortcuts to navigate.'

export const GLOBAL_KEY_COMBOS = [
  { title: "Open Todo's", keys: ['1'] },
  { title: 'Open Inbox', keys: ['2'] },
  { title: 'Open Search', keys: [modifierKeyDisplay, 'K'] },
  { title: 'Open Compose', keys: ['C'] },
  { title: 'Open Help', keys: ['SHIFT', '→'] },
  { title: 'Open Feedback', keys: [modifierKeyDisplay, '.'] },
  { title: 'Open Keyboard shortcuts', keys: [modifierKeyDisplay, '/'] },
  { title: 'Focus Mode / Sort Inbox', keys: [modifierKeyDisplay, 'E'] },
  { title: 'Close Window / Back', keys: ['ESCAPE'] },
  { title: 'Highlight Previous', keys: ['↑'] },
  { title: 'Highlight Next', keys: ['↓'] },
  { title: 'Open Highlighted Email', keys: ['ENTER'] },
  { title: 'Refresh Inbox', subTitle: 'When on the Inbox', keys: ['R'] },
]

export const EMAIL_KEY_TITLE = 'Email'
export const EMAIL_KEY_SUB_TITLE =
  'These shortcuts are available when you are on the email detail page.'

export const EMAIL_DETAIL_COMBOS = [
  { title: 'Mark Email as To Do', keys: [modifierKeyDisplay, 'E'] },
  { title: 'Archive Email', keys: [modifierKeyDisplay, 'BACKSPACE'] },
  {
    title: 'Delete Email',
    subTitle: 'When Archive Email is unavailable',
    keys: [modifierKeyDisplay, 'BACKSPACE'],
  },
  { title: 'Reply to Email', keys: [modifierKeyDisplay, 'ENTER'] },
  { title: 'Forward Email', keys: ['SHIFT', 'ENTER'] },
  { title: 'Skip Email', keys: ['SHIFT', 'K'] },
  { title: 'Unsubscribe Email', keys: [modifierKeyDisplay, 'SHIFT', 'U'] },
  {
    title: 'Next Email',
    subTitle: 'When option is available',
    keys: ['→'],
  },
  {
    title: 'Previous Email',
    subTitle: 'When option is available',
    keys: ['←'],
  },
]

export const COMPOSE_KEY_TITLE = 'Compose'
export const COMPOSE_KEY_SUB_TITLE = 'Use these shortcuts when composing.'

export const COMPOSE_KEY_COMBOS = [
  { title: 'Send Email', keys: [modifierKeyDisplay, 'ENTER'] },
]
