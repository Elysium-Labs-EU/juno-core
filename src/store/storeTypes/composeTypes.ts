import type { IEmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import type { IContact } from 'store/storeTypes/contactsTypes'

export interface IComposePayload {
  bcc?: Array<IContact>
  body?: string
  cc?: Array<IContact>
  files?: Array<File> | undefined
  id?: string
  subject?: string
  threadId?: string | undefined
  to?: Array<IContact>
  value?: string
  signature?: string
}

export interface IComposeEmail {
  bcc: Array<IContact>
  body: string
  cc: Array<IContact>
  subject: string
  to: Array<IContact>
}
export interface IComposeEmailReceive {
  bcc?: string | Array<IContact> | undefined
  body?: string | undefined
  cc?: string | Array<IContact> | undefined
  files?: Array<File> | Array<IEmailAttachmentType> | undefined
  id?: string | undefined
  subject?: string | undefined | null
  threadId?: string | undefined
  to?: string | Array<IContact> | undefined
}
