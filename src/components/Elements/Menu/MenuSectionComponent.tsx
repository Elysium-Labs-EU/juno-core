import * as Separator from '@radix-ui/react-separator'
import { Fragment } from 'react'
import type { KeyboardEvent } from 'react'

import * as keyConstants from 'constants/keyConstants'
import handleChangeFocus from 'utils/handleChangeFocus'

import MenuItemComponent from './MenuItemComponent'
import type { IMenuSection, IMenuItemCollection } from './MenuTypes'
import Stack from '../Stack/Stack'

function getAllItems(items: Array<IMenuItemCollection>) {
  return items.map((list) => list.items).reduce((a, b) => a.concat(b))
}

function getItemIndex(
  items: Array<IMenuItemCollection>,
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
}: IMenuSection) => {
  const keyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    const nodeList = document.querySelectorAll(
      `.${activeModalTag}-menu-item`
    ) as NodeListOf<HTMLButtonElement | HTMLAnchorElement>

    // eslint-disable-next-line default-case
    switch (event.code) {
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
        nodeList[0]?.focus()
        setFocusedItemIndex(0)
        break
      case 'End':
        event.preventDefault()
        nodeList[nodeList.length - 1]?.focus()
        setFocusedItemIndex(nodeList.length - 1)
        break
      case 'Enter':
        event.preventDefault()
        event.stopPropagation()
        nodeList[focusedItemIndex]?.click()
        break
      // default:
      // ;(event.target as HTMLButtonElement).focus()
      // ;(event.target as HTMLElement).focus()
    }
  }

  return (
    <Stack
      direction="vertical"
      onKeyDown={keyDownHandler}
      role="menu"
      tabIndex={-1}
    >
      {menuItems.map(({ id, items }, index, array) => (
        <Fragment key={id}>
          <Stack direction="vertical" spacing="mini">
            {items.map((item) => {
              if (item) {
                return (
                  <MenuItemComponent
                    absoluteIndex={getItemIndex(menuItems, item.id)}
                    activeModalTag={activeModalTag}
                    focusedItemIndex={focusedItemIndex}
                    item={item}
                    key={item.title}
                    setFocusedItemIndex={setFocusedItemIndex}
                  />
                )
              }
              return null
            })}
          </Stack>
          {/* Only add a separator whenever the batch of items isn't the last one */}
          {array.length - 1 > index ? (
            <Separator.Root
              style={{
                backgroundColor: 'var(--color-neutral-700)',
                height: '1px',
                width: '100%',
              }}
            />
          ) : null}
        </Fragment>
      ))}
    </Stack>
  )
}

export default MenuSectionComponent
