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
