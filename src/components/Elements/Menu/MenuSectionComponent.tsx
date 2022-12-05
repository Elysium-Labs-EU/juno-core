import { Dispatch, KeyboardEvent, SetStateAction } from 'react'

import * as keyConstants from 'constants/keyConstants'
import handleChangeFocus from 'utils/handleChangeFocus'

import MenuItemComponent from './MenuItemComponent'
import { MenuSection, MenuSectionContainer } from './MenuStyles'
import type { IMenuItemCollection } from './MenuTypes'

function getAllItems(items: IMenuItemCollection[]) {
  return items.map((list) => list.items).reduce((a, b) => a.concat(b))
}

function getItemIndex(
  items: IMenuItemCollection[],
  id: string,
  startIndex: number = 0
) {
  return getAllItems(items).findIndex((i) => i?.id === id) + startIndex
}

const MenuSectionComponent = ({
  activeModalTag,
  menuItems,
  focusedItemIndex,
  setFocusedItemIndex,
}: {
  activeModalTag: string
  menuItems: IMenuItemCollection[]
  focusedItemIndex: number
  setFocusedItemIndex: Dispatch<SetStateAction<number>>
}) => {
  const keyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    const nodeList = document.querySelectorAll(
      `.${activeModalTag}-menu-item`
    ) as NodeListOf<HTMLButtonElement | HTMLAnchorElement>

    // eslint-disable-next-line default-case
    switch (event?.code) {
      case keyConstants.KEY_ARROWS.up:
      case keyConstants.KEY_ARROWS.left:
        event.preventDefault()
        event.stopPropagation()
        handleChangeFocus({
          direction: 'up',
          focusedItemIndex,
          setFocusedItemIndex,
          sourceTag: `${activeModalTag}-menu-item`,
        })
        break
      case keyConstants.KEY_ARROWS.down:
      case keyConstants.KEY_ARROWS.right:
        event.preventDefault()
        event.stopPropagation()
        handleChangeFocus({
          direction: 'down',
          focusedItemIndex,
          setFocusedItemIndex,
          sourceTag: `${activeModalTag}-menu-item`,
        })
        break
      case 'Home':
        event.preventDefault()
        nodeList[0].focus()
        setFocusedItemIndex(0)
        break
      case 'End':
        event.preventDefault()
        nodeList[nodeList.length - 1].focus()
        setFocusedItemIndex(nodeList.length - 1)
        break
      case 'Enter':
        event.preventDefault()
        event.stopPropagation()
        nodeList[focusedItemIndex].click()
        break
      // default:
      // ;(event.target as HTMLButtonElement).focus()
      // ;(event.target as HTMLElement).focus()
    }
  }

  return (
    <MenuSectionContainer tabIndex={-1} onKeyDown={keyDownHandler} role="menu">
      {menuItems.map(({ id, items }) => (
        <MenuSection key={id}>
          {items.map((item) => (
            <MenuItemComponent
              absoluteIndex={getItemIndex(menuItems, item.id)}
              activeModalTag={activeModalTag}
              focusedItemIndex={focusedItemIndex}
              item={item}
              key={item.title}
              setFocusedItemIndex={setFocusedItemIndex}
            />
          ))}
        </MenuSection>
      ))}
    </MenuSectionContainer>
  )
}

export default MenuSectionComponent
