import { IEmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import { IContact } from 'store/storeTypes/contactsTypes'

export interface IComposePayload {
  bcc?: IContact[]
  body?: string
  cc?: IContact[]
  files?: File[] | undefined
  id?: string
  subject?: string
  threadId?: string | undefined
  to?: IContact[]
  value?: string
  signature?: string
}

export interface IComposeEmail {
  bcc: IContact[]
  body: string
  cc: IContact[]
  subject: string
  to: IContact[]
}
export interface IComposeEmailReceive {
  bcc?: string | IContact[] | undefined
  body?: string | undefined
  cc?: string | IContact[] | undefined
  files?: File[] | IEmailAttachmentType[] | undefined
  id?: string | undefined
  subject?: string | undefined
  threadId?: string | undefined
  to?: string | IContact[] | undefined
}
