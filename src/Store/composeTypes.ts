import { Contact } from './contactsTypes'

export interface ComposePayload {
  id?: string
  value?: string
  body?: string | string[]
  subject?: string
  to?: Contact[]
  cc?: Contact[]
  bcc?: Contact[]
}

export interface ComposeEmail {
  to: Contact[]
  cc: Contact[]
  bcc: Contact[]
  subject: string
  body: string
}

export interface ComposeState {
  composeEmail: any
}
