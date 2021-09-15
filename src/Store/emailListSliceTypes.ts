export interface EmailMessage {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  payload: {
    partId: string
    mimeType: string
    fileName: string
    headers: any
    body: {
      size: number
    }
    parts: any
  }
  sizeEstimate: number
  historyId: string
  internalDate: string
}

export interface EmailListThreadItem {
  id: string
  historyId: string
  messages: EmailMessage[]
}

export interface EmailListObject {
  labels: string[]
  threads: EmailListThreadItem[]
  nextPageToken: string
}

export interface EmailListState {
  emailList: EmailListObject[]
  isFocused: boolean
  isSorting: boolean
}
