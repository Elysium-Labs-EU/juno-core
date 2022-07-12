export interface IEmailMessagePayload {
  partId: string
  mimeType: string
  filename: string
  headers: any
  body: {
    data?: string
    attachmentId?: string
    size: number
  }
  parts: IEmailMessagePayload[]
}

export interface IEmailMessage {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  payload: IEmailMessagePayload
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
