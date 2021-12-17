export interface OpenDraftEmailType {
  messageId: string
  id: string
}

export interface DraftDetails {
  draftId: string
}

export interface FullEmailType {
  historyId: string
  id: string
  internalDate: string
  labelIds: string[]
  payload: {
    body: any
    headers: any
  }
  mimeType: string
  threadId: string
  snippet: string
}

export interface EnhancedDraftDetails {
  draft: {
    id: string
    message: FullEmailType
  }
}

export interface MessagePayload {
  name: string
  value?: string
}

export interface ComposedEmail {
  draftId: string
  threadId: string
  messageId: string
  labelIds: string[]
  to: string
  cc: string
  bcc: string
  subject: string
  body: string
}

export interface DraftDetailObject {
  id: string
  message: {
    id: string
    threadId: string
    labelIds: string[]
  }
}

export interface DraftListObject {
  id: string
  message: {
    id: string
    threadId: string
  }
}

export interface DraftsState {
  draftListLoaded: boolean
  draftList: DraftListObject[]
  draftDetails: any
}
