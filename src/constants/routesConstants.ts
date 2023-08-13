const ROUTES = {
  TODO: '/',
  EMAIL_DETAIL: '/mail/:labelId/:threadId/:overviewId',
  SENT: '/sent',
  SPAM: '/spam',
  LOGIN: '/login',
  GOOGLE_CALLBACK: '/oauth2callback',
  GOOGLE_AUTH_EXPLANATION: '/google_auth_explanation',
  INBOX: '/inbox',
  ARCHIVE: '/archive',
  TRASH: '/delete',
  WILDCARD: '*',
} as const

export default ROUTES
