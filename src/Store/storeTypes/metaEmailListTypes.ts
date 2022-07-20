export interface UpdateRequest {
  addLabelIds?: string[]
  removeLabelIds?: string[]
  delete?: boolean
}

export interface UpdateRequestParamsBatch {
  request: UpdateRequest
}
export interface UpdateRequestParamsSingle {
  threadId?: string
  messageId?: string
  request: UpdateRequest
  labelIds: string[]
}

export interface MetaListThreadItem {
  id: string
  snippet: string
  historyId: string
}
