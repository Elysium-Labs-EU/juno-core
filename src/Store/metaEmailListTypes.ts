export interface UpdateRequest {
  addLabelIds?: string[]
  removeLabelIds?: string[]
  delete?: boolean
}

export interface UpdateRequestParamsBatch {
  request: UpdateRequest
}
export interface UpdateRequestParamsSingle {
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
