export interface UpdateRequest {
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
  q?: string
  labelIds: string[]
  maxResults: number
  nextPageToken: string | null
  silentLoading?: boolean
  activeMetaObjArray?: MetaListThreadItem[]
}
