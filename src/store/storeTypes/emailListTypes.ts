export interface ISelectedEmail {
  labelIds: Array<string>
  selectedIds: Array<string>
}

export interface ISelectedEmailAction {
  event: 'add' | 'remove'
  id: string
  labelIds: Array<string>
}

export interface IEmailMessageHeaders {
  date: string
  from: string
  subject: string
  to: string
  cc: string
  bcc: string
}

export interface IEmailMessagePayloadRaw {
  partId: string
  mimeType: string
  filename: string
  headers: IEmailMessageHeaders
  body: {
    data?: string
    attachmentId?: string
    size: number
  }
  parts?: Array<IEmailMessagePayloadRaw>
}

export interface IEmailMessagePayloadConverted {
  mimeType: string
  headers: IEmailMessageHeaders
  files?: undefined | Array<IEmailMessagePayloadRaw>
  body?: {
    emailFileHTML: Array<any>
    emailHTML: string
    removedTrackers: Array<string>
  }
  parts?: Array<IEmailMessagePayloadRaw>
}

export interface IEmailMessage {
  id: string
  threadId: string
  labelIds: Array<string>
  snippet: string
  payload: IEmailMessagePayloadConverted
  sizeEstimate: number
  historyId: string
  internalDate: string
}

export interface IEmailListThreadItem {
  id: string
  historyId: string
  messages: Array<IEmailMessage>
}

export interface IEmailListObject {
  labels: Array<string>
  threads: Array<IEmailListThreadItem>
  nextPageToken: string | null | undefined
  resultSizeEstimate?: number
  timestamp?: number
  q?: string
}

export interface IEmailListState {
  activeEmailListIndex: number
  emailList: Array<IEmailListObject>
  isFetching: boolean
  searchList: IEmailListObject | null
  selectedEmails: ISelectedEmail
}

export type TBaseEmailList = Array<{
  labels: Array<string>
  nextPageToken: null
  threads: Array<any>
}>
