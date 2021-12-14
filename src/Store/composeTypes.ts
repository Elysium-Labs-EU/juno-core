export interface ComposePayload {
  id?: string
  value?: string
  body?: string | string[]
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
