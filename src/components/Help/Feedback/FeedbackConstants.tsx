import { QiWarningAlt, QiChat, QiGift } from 'images/svgIcons/quillIcons'

import type { IFeedbackTypeMapItem } from './Feedback'

export const FEEDBACK_TYPE_MAP: Array<IFeedbackTypeMapItem> = [
  { type: 'BUG' },
  { type: 'FEEDBACK' },
  { type: 'IDEA' },
]

export const ICON_MAP: { [key: string]: JSX.Element } = {
  BUG: <QiWarningAlt />,
  FEEDBACK: <QiChat />,
  IDEA: <QiGift />,
}

export const MODAL_TITLE = 'Send feedback'
export const MODAL_SUB_TITLE =
  'Your feedback is highly appreciated. We are here to get this right for you.'
export const FEEDBACK_TEXT_AREA_PLACEHOLDER =
  'How can Juno improve for you? (If you are reporting a bug, how did it happen?)'
export const SUCCESS_MESSAGE = 'Thank you for submitting the feedback!'
