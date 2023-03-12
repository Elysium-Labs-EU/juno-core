import { Span } from 'styles/globalStyles'

import * as S from './MenuStyles'
import type { IMenuItemComponent } from './MenuTypes'

const MenuItemComponent = ({
  activeModalTag,
  item,
  absoluteIndex,
  focusedItemIndex,
  setFocusedItemIndex,
}: IMenuItemComponent) => (
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
      data-cy={item.title}
      tabIndex={absoluteIndex}
      role="menuitem"
    >
      {item.title}
    </S.MenuItemContentMain>
    {item?.hint && (
      <S.MenuItemContentSide data-cy="item-hint">
        {item.hint.map((it) => (
          <Span key={it}>{it}</Span>
        ))}
      </S.MenuItemContentSide>
    )}
  </S.MenuItem>
)

export default MenuItemComponent
