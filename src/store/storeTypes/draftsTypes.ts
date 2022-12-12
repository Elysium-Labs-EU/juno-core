export interface IOpenDraftEmailType {
  messageId: string
  id: string
}

export interface IDraftDetails {
  draftId: string
}

export interface IFullEmailType {
  historyId: string
  id: string
  internalDate: string
  labelIds: string[]
  payload: {
    body: any
    headers: any
    files: any
  }
  mimeType: string
  threadId: string
  snippet: string
}

export interface IEnhancedIDraftDetails {
  draft: {
    id: string
    message: Partial<IFullEmailType>
  }
}

export interface IMessagePayload {
  name: string
  value?: string
}

export interface IDraftDetailObject {
  id: string
  message: {
    id: string
    threadId: string
    labelIds: string[]
  }
}

export interface IDraftsState {
  draftList: IDraftDetailObject[]
}
