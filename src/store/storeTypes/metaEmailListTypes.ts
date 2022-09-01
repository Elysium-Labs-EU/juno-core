export interface UpdateRequest {
  addLabelIds?: string[]
  removeLabelIds?: string[]
  delete?: boolean
}

export interface UpdateRequestParamsBatch {
  request: UpdateRequest
}
export interface UpdateRequestParamsSingle {
  threadId: string
  request: UpdateRequest
  labelIds: string[]
  location?: any
}

export interface MetaListThreadItem {
  id: string
  snippet: string
  historyId: string
}
