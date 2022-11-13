import { Dispatch, SetStateAction } from 'react'

interface IHandleChangeFocus {
  direction?: 'up' | 'down'
  focusedItemIndex: number
  setFocusedItemIndex: Dispatch<SetStateAction<number>>
  sourceTag: string
  doNotMoveFocus?: boolean
}

/**
 * @function handleChangeFocus
 * @param {object} - an object with the requried properties
 * @description - a custom hook that handles the changing of focus when a user is using the keyboard to navigate the menu
 */

export default function handleChangeFocus({
  direction,
  focusedItemIndex,
  setFocusedItemIndex,
  sourceTag,
  doNotMoveFocus = false,
}: IHandleChangeFocus) {
  // Source tag is the className of the items to handle
  const items = document.querySelectorAll(`.${sourceTag}`)

  let index = 0
  let newIndex = 0

  if (direction === 'down') {
    items.forEach((_, i) => {
      if (i === focusedItemIndex) {
        index = i
      }
    })

    newIndex = index === items.length - 1 ? 0 : index + 1
  } else if (direction === 'up') {
    items.forEach((_, i) => {
      if (i === focusedItemIndex) {
        index = i
      }
    })

    newIndex = !index ? items.length - 1 : index - 1
  } else {
    setFocusedItemIndex(0)
  }

  const newItem: Element = items[newIndex]

  if (newItem && typeof newIndex === 'number') {
    setFocusedItemIndex(newIndex)
    if (newItem instanceof HTMLElement && !doNotMoveFocus) {
      newItem.focus()
    }
    newItem.scrollIntoView({
      behavior: 'smooth',
      block: newIndex ? 'center' : 'end',
    })
  }
}
