import { Location } from 'react-router-dom'

export interface IUpdateRequest {
  addLabelIds?: string[]
  removeLabelIds?: string[]
  delete?: boolean
}

export interface IUpdateRequestParamsBatch {
  request: IUpdateRequest
}
export interface IUpdateRequestParamsSingle {
  threadId: string
  request: IUpdateRequest
  labelIds: string[]
  location?: Location
}
