export interface GoogleLabel {
  id: string
  labelListVisibility: string
  messageListVisibility: string
  name: string
  type: string
}
export interface LabelIdName {
  id: string
  name: string
}
export interface LabelState {
  labelIds: string[]
  loadedInbox: string[]
  storageLabels: LabelIdName[]
}
