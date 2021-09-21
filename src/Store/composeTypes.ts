export interface SendComposeEmail {
  history: any
  messageId: string
}

export interface ComposePayload {
  id: string
  value: string
}

export interface ComposeEmail {
  to: string
  subject: string
  body: string
}

export interface ComposeState {
  composeEmail: any
}
