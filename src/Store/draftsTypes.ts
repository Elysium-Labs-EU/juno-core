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
