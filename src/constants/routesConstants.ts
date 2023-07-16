const ROUTES = {
  TODO: '/',
  EMAIL_DETAIL: '/mail/:labelId/:threadId/:overviewId',
  COMPOSE_EMAIL: '/compose/',
  DRAFT: '/draft',
  SENT: '/sent',
  SPAM: '/spam',
  LOGIN: '/login',
  GOOGLE_CALLBACK: '/oauth2callback',
  GOOGLE_AUTH_EXPLANATION: '/google_auth_explanation',
  GOOGLE_CALLBACK_TEST: '/oauth2callback_test',
  INBOX: '/inbox',
  ARCHIVE: '/archive',
  TRASH: '/delete',
  WILDCARD: '*',
} as const

export default ROUTES
