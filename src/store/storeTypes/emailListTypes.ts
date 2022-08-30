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
  parts?: IEmailMessagePayloadRaw[]
}

export interface IEmailMessagePayloadConverted {
  mimeType: string
  headers: IEmailMessageHeaders
  files?: undefined | IEmailMessagePayloadRaw[]
  body?: {
    emailFileHTML: any[]
    emailHTML: string
    removedTrackers: string[]
  }
  parts?: IEmailMessagePayloadRaw[]
}

export interface IEmailMessage {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  payload: IEmailMessagePayloadConverted
  sizeEstimate: number
  historyId: string
  internalDate: string
}

export interface IEmailListThreadItem {
  id: string
  historyId: string
  messages: IEmailMessage[]
}

export interface IEmailListObject {
  labels: string[]
  threads: IEmailListThreadItem[]
  nextPageToken: string | null
  resultSizeEstimate?: number
  timestamp?: number
}

export interface IEmailListObjectSearch {
  q?: string
  threads: IEmailListThreadItem[]
  nextPageToken: string | null
}

export interface IEmailListState {
  emailList: IEmailListObject[]
  selectedEmails: string[]
  searchList: IEmailListObjectSearch | null
  activeEmailListIndex: number
  isFetching: boolean
}
