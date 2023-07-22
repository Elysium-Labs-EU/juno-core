// SYSTEM CODE
export const ACCESS_TOKEN = 'accessToken'
export type TActivePageHeader =
  | 'compose'
  | 'inbox'
  | 'more'
  | 'search'
  | 'spam'
  | 'todo'
export const ACTIVE_PAGE_HEADER = {
  compose: 'compose' as TActivePageHeader,
  inbox: 'inbox' as TActivePageHeader,
  more: 'more' as TActivePageHeader,
  search: 'search' as TActivePageHeader,
  spam: 'spam' as TActivePageHeader,
  todo: 'todo' as TActivePageHeader,
}
export const ACTIVE_MODAL_MAP = {
  attachment: 'attachment',
  betaAccess: 'betaAccess',
  // feedback: 'feedback',
  help: 'help',
  intro: 'intro',
  keyboard: 'keyboard',
  navigation: 'navigation',
  search: 'search',
  settings: 'settings',
  signature: 'signature',
} as const
export const ARCHIVE_LABEL = 'ARCHIVE'
export const AUTH_SCREEN_ACCEPTED = 'authScreenAccepted'
export const BACK_TO_EMAIL = 'backToEmail'
export const CORE_STATUS_MAP = {
  focused: 'isFocused',
  searching: 'isSearching',
  sorting: 'isSorting',
}
export const CREDENTIALS = 'credentials'
export const DRAFT_LABEL = 'DRAFT'
export const EMAIL_BODY_INVISIBLE = 'invisible'
export const EMAIL_BODY_VISIBLE = 'visible'
export const HISTORY_NEXT_PAGETOKEN = 'history'
export const HISTORY_TIME_STAMP = 0
export const ID_TOKEN = 'idToken'
export const INBOX_LABEL = 'INBOX'
export const TODO_LABEL_NAME = 'Juno/To Do'
export const JUNO_SETTINGS_LOCAL = 'junoSettings'
export const JUNO_SIGNATURE = 'juno_signature'
export const JUNO_BASE_LABEL = 'Juno'
export const LAST_REFRESH = 'lastRefresh'
export const LOAD_STATE_MAP = {
  idle: 'idle',
  loading: 'loading',
  loaded: 'loaded',
  error: 'error',
}
export const MAX_RESULTS = 20
export const MESSAGE_SEND_DELAY = 3000
export const MIN_DELAY_REFRESH = 3500
export const REFRESH_TOKEN = 'refreshToken'
export const SEARCH_LABEL = 'SEARCH'
export const SENT_LABEL = 'SENT'
export const SPAM_LABEL = 'SPAM'
export const UNREAD_LABEL = 'UNREAD'
export const TRASH_LABEL = 'TRASH'

// DISPLAY
export const BETA_VERSION = 'Private Beta'
export const BUTTON_BACK = 'Back'
export const BUTTON_FOCUS = 'Focus mode'
export const ERROR_MESSAGE = 'Something went wrong, try again.'
export const FILE = 'File - '
export const HEADER_ARCHIVE = 'archive'
export const HEADER_DRAFT = 'drafts'
export const HEADER_INBOX = 'inbox'
export const HEADER_SENT = 'sent'
export const HEADER_SPAM = 'spam'
export const HEADER_TODO = 'todo'
export const HEADER_TRASH = 'trash'
export const INVALID_SESSION = 'Invalid session'
export const INVALID_TOKEN = 'Invalid token'
export const LOAD_MORE = 'Load more messages'
export const LOADING_TEXT = 'Loading'
export const ME_LABEL = 'me'
export const NETWORK_ERROR = 'Network Error. Please try again later'
export const NO_MORE_RESULTS = "You've reached the end."
export const NO_SUBJECT = '(No subject)'
export const NOTHING_TO_SEE = 'Nothing to see here'
export const SOMETHING_WRONG = 'Something went wrong whilst loading data.'

export const OPERATING_SYSTEMS = {
  LINUX_OS: 'Linux OS',
  MAC_OS: 'MacOS',
  UNIX_OS: 'UNIX OS',
  WINDOWS_OS: 'Windows OS',
} as const
