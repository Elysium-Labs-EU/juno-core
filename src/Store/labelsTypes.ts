interface LabelColor {
  backgroundColor: string
  textColor: string
}

export interface GoogleLabel {
  id: string
  labelListVisibility?: string
  messageListVisibility?: string
  name: string
  type: string
  color?: LabelColor
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
