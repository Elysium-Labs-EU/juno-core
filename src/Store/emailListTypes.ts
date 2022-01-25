export interface IEmailMessagePayload {
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
  messages?: IEmailMessage[]
  message?: IEmailMessage
}

export interface IEmailListObject {
  labels: string[]
  threads: IEmailListThreadItem[]
  nextPageToken: string
}

export interface IEmailListObjectSearch {
  threads: IEmailListThreadItem[]
  nextPageToken: string | null
}

export interface IEmailListState {
  emailList: IEmailListObject[]
  searchList: IEmailListObject | null
  isFocused: boolean
  isSearching: boolean
  isSorting: boolean
  isFetching: boolean
}
