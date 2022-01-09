export interface EmailMessage {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  payload: EmailMessagePayload
  sizeEstimate: number
  historyId: string
  internalDate: string
}

export interface EmailMessagePayload {
  partId: string
  mimeType: string
  filename: string
  headers: any
  body: {
    data?: string
    size: number
  }
  parts: any
}

export interface EmailListThreadItem {
  id: string
  historyId: string
  messages?: EmailMessage[]
  message?: EmailMessage
}

export interface EmailListObject {
  labels: string[]
  threads: EmailListThreadItem[]
  nextPageToken: string
}

export interface EmailListObjectSearch {
  labels: string[] | undefined
  threads: EmailListThreadItem[]
  nextPageToken: string | null
}

export interface EmailListState {
  emailList: EmailListObject[]
  isFocused: boolean
  isSorting: boolean
  isFetching: boolean
}
