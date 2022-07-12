import { Contact } from './contactsTypes'

export interface IComposePayload {
  id?: string
  value?: string
  body?: string | string[]
  subject?: string
  to?: Contact[]
  cc?: Contact[]
  bcc?: Contact[]
}

export interface IComposeEmail {
  to: Contact[]
  cc: Contact[]
  bcc: Contact[]
  subject: string
  body: string
}
export interface IComposeEmailReceive {
  to: string
  cc: string
  bcc: string
  subject: string
  body: string
}

export interface IComposeState {
  composeEmail: any
}
