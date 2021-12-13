export interface UpdateRequest {
  addLabelIds?: string[]
  removeLabelIds?: string[]
  delete?: boolean
}

export interface UpdateRequestParams {
  location?: any
  messageId: string
  request: UpdateRequest
  labelIds: string[]
}

export interface MetaListThreadItem {
  id: string
  snippet: string
  historyId: string
}

export interface LoadEmailObject {
  labelIds: string[]
  maxResults: number
  nextPageToken?: string
  silentLoading?: boolean
  activeMetaObjArray?: MetaListThreadItem[]
}
