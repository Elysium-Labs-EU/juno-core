import { FiArrowDown, FiArrowUp } from 'react-icons/fi'

export const MODAL_TITLE = 'Keyboard Combos'

export const GLOBAL_KEY_TITLE = 'Global'
export const GLOBAL_KEY_SUB_TITLE = 'Use these shortcuts to navigate.'

export const GLOBAL_KEY_COMBOS = [
  { title: "Open Todo's", keys: ['1'] },
  { title: 'Open Inbox', keys: ['2'] },
  { title: 'Open Search', keys: ['3'] },
  { title: 'Open Compose', keys: ['4'] },
  { title: 'Open Help', keys: ['CMD', '/'] },
  { title: 'Focus Mode / Sort Inbox', keys: ['CMD', 'E'] },
  { title: 'Close Window / Back', keys: ['ESCAPE'] },
  { title: 'Highlight Previous', keys: [<FiArrowUp />] },
  { title: 'Highlight Next', keys: [<FiArrowDown />] },
  { title: 'Open Highlighted Email', keys: ['ENTER'] },
]

export const EMAIL_KEY_TITLE = 'Email'
export const EMAIL_KEY_SUB_TITLE =
  'These shortcuts are available when you are on the email details page.'

export const EMAIL_DETAIL_COMBOS = [
  { title: 'Mark Email as To Do', keys: ['CMD', 'E'] },
  { title: 'Archive Email', keys: ['CMD', 'BACKSPACE'] },
  { title: 'Reply to Email', keys: ['ENTER'] },
  { title: 'Forward Email', keys: ['SHIFT', 'ENTER'] },
  { title: 'Skip Email', keys: ['CMD', 'SHIFT', 'K'] },
]
