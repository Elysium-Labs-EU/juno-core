import type { IEmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import type { TContact } from 'store/storeTypes/contactsTypes'

export interface IComposePayload {
  bcc?: Array<TContact>
  body?: string
  cc?: Array<TContact>
  files?: Array<File> | undefined
  id?: string
  subject?: string
  threadId?: string | undefined
  to?: Array<TContact>
  value?: string
  signature?: string
}

export interface IComposeEmail {
  bcc: Array<TContact>
  body: string
  cc: Array<TContact>
  subject: string
  to: Array<TContact>
}
export interface IComposeEmailReceive {
  bcc?: string | Array<TContact> | undefined
  body?: string | undefined
  cc?: string | Array<TContact> | undefined
  files?: Array<File> | Array<IEmailAttachmentType> | undefined
  id?: string | undefined
  subject?: string | undefined | null
  threadId?: string | undefined
  to?: string | Array<TContact> | undefined
}
