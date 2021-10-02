export interface SendComposeEmail {
  history: any
  messageId: string
}

export interface ComposePayload {
  id?: string
  value?: string
  body?: string
  subject?: string
  to?: string
}

export interface ComposeEmail {
  to: string
  subject: string
  body: string
}

export interface ComposeState {
  composeEmail: any
}
