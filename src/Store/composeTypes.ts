import { Contact } from './contactsTypes'

export interface ComposePayload {
  id?: string
  value?: string
  body?: string | string[]
  subject?: string
  to?: Contact[]
  cc?: Contact[]
  bcc?: Contact[]
  attachment?: any
}

export interface ComposeEmail {
  to: Contact[]
  cc: Contact[]
  bcc: Contact[]
  subject: string
  body: string
  attachment: any
}

export interface ComposeState {
  composeEmail: any
}
