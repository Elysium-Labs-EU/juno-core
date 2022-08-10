import { IContact } from './contactsTypes'

export interface IComposePayload {
  id?: string
  value?: string
  body?: string | string[]
  subject?: string
  to?: IContact[]
  cc?: IContact[]
  bcc?: IContact[]
}

export interface IComposeEmail {
  to: IContact[]
  cc: IContact[]
  bcc: IContact[]
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
