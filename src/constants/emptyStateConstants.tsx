import EmptyStateFour from '../components/EmailList/EmptyStates/EmptyStateSVG/EmptyStateFour'
import EmptyStateOne from '../components/EmailList/EmptyStates/EmptyStateSVG/EmptyStateOne'
import EmptyStateThree from '../components/EmailList/EmptyStates/EmptyStateSVG/EmptyStateThree'
import EmptyStateTwo from '../components/EmailList/EmptyStates/EmptyStateSVG/EmptyStateTwo'

export const INBOX_HEADER = 'Inbox zero'
export const INBOX_PARAGRAPH = 'You have reached it!'
export const INBOX_SVG = <EmptyStateOne />

export const TODO_HEADER = 'To do or not to do'
export const TODO_PARAGRAPH = 'You currently have no to-dos - check you inbox?'
export const TODO_SVG = <EmptyStateTwo />

export const DRAFT_HEADER = 'No work left unsent'
export const DRAFT_PARAGRAPH = 'All your unsent thoughts will be saved here'
export const DRAFT_SVG = <EmptyStateThree />

export const SENT_HEADER = 'Start sending emails'
export const SENT_PARAGRAPH = 'No one has seen an email from you yet!'
export const SENT_SVG = <EmptyStateFour />
