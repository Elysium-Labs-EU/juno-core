export interface IMenuItem {
  id: string
  title: string
  onClick: () => void
  hint?: string[]
}

export interface IMenuItemCollection {
  id: string
  items: IMenuItem[]
}
