import { Dispatch, SetStateAction } from 'react'
import * as S from './MenuStyles'
import { IMenuItem } from './MenuTypes'

const MenuItemComponent = ({
  activeModalTag,
  item,
  absoluteIndex,
  focusedItemIndex = undefined,
  setFocusedItemIndex = undefined,
}: {
  activeModalTag: string
  item: IMenuItem
  absoluteIndex: number
  focusedItemIndex?: number
  setFocusedItemIndex?: Dispatch<SetStateAction<number>>
}) => (
  <S.MenuItem
    aria-label={item.title}
    className={`${activeModalTag}-menu-item`}
    onClick={() => item.onClick()}
    onFocus={
      setFocusedItemIndex ? () => setFocusedItemIndex(absoluteIndex) : undefined
    }
    onMouseOver={
      setFocusedItemIndex ? () => setFocusedItemIndex(absoluteIndex) : undefined
    }
    isFocused={focusedItemIndex === absoluteIndex}
  >
    <S.MenuItemContentMain
      data-test-id="item-title"
      tabIndex={absoluteIndex}
      role="menuitem"
    >
      {item.title}
    </S.MenuItemContentMain>
    {item?.hint && (
      <S.MenuItemContentSide data-test-id="item-hint">
        {item.hint.map((it) => (
          <span key={it}>{it}</span>
        ))}
      </S.MenuItemContentSide>
    )}
  </S.MenuItem>
)

export default MenuItemComponent
