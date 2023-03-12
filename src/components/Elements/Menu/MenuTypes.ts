import type { Dispatch, SetStateAction } from 'react'

interface IMenuItem {
  id: string
  title: string
  onClick: () => void
  hint?: Array<string>
}

export interface IMenuItemCollection {
  id: string
  items: Array<IMenuItem | null>
}

export interface IMenu {
  activeModalTag: string
  dataTestId?: string
  handleClose: () => void
  menuItems: Array<IMenuItemCollection>
  triggerButton: JSX.Element
}

export interface IMenuSection
  extends Pick<IMenu, 'activeModalTag' | 'menuItems'> {
  focusedItemIndex: number
  setFocusedItemIndex: Dispatch<SetStateAction<number>>
}

export interface IMenuItemComponent
  extends Pick<
    IMenuSection,
    'activeModalTag' | 'focusedItemIndex' | 'setFocusedItemIndex'
  > {
  item: IMenuItem
  absoluteIndex: number
}
