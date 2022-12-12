interface ILabelColor {
  backgroundColor: string
  textColor: string
}

export interface IGoogleLabel {
  color?: ILabelColor
  id: string
  labelListVisibility?: string
  messageListVisibility?: string
  name: string
  type: string
}
export interface ILabelIdName {
  id: string
  name: string
}
export interface ILabelState {
  labelIds: Array<string>
  loadedInbox: Array<string>
  storageLabels: Array<Pick<IGoogleLabel, 'id' | 'name'>>
}
