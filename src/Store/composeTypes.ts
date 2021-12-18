export interface ComposePayload {
  id?: string
  value?: string
  body?: string | string[]
  subject?: string
  to?: string[]
  cc?: string[]
  bcc?: string[]
}

export interface ComposeEmail {
  to: string[]
  cc: string[]
  bcc: string[]
  subject: string
  body: string
}

export interface ComposeState {
  composeEmail: any
}
