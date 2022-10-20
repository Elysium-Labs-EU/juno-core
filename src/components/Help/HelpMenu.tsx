import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'

import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import useKeyPress from '../../hooks/useKeyPress'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectActiveModal, setActiveModal } from '../../store/utilsSlice'
import { modifierKeyDisplay } from '../../utils/setModifierKey'
import * as S from './HelpStyles'

const MenuSection = ({
  menuItems,
  focusedItemIndex,
  setFocusedItemIndex,
}: {
  menuItems: { title: string; onClick: () => void; hint?: string[] }[][]
  focusedItemIndex: number
  setFocusedItemIndex: (newIndex: number) => void
}) => {
  const menuItemsFlatArray = menuItems.flat(1)
  return (
    <>
      {menuItems.map((section, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <S.MenuSection key={index}>
          {section.map((item) => {
            const absoluteIndex = menuItemsFlatArray.findIndex(
              (mItem) => mItem.title === item.title
            )
            return (
              <S.MenuItem
                key={item.title}
                onClick={() => item.onClick()}
                onFocus={() => setFocusedItemIndex(absoluteIndex)}
                onMouseOver={() => setFocusedItemIndex(absoluteIndex)}
                isFocused={focusedItemIndex === absoluteIndex}
              >
                <S.MenuItemContentMain data-test-id="item-title">
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
          })}
        </S.MenuSection>
      ))}
    </>
  )
}

const HelpMenu = forwardRef((_props, ref) => {
  const dispatch = useAppDispatch()
  const activeModal = useAppSelector(selectActiveModal)
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1)
  const ArrowDownListener = useKeyPress(keyConstants.KEY_ARROWS.down)
  const ArrowUpListener = useKeyPress(keyConstants.KEY_ARROWS.up)
  const KeyJListener = useKeyPress(keyConstants.KEY_LETTERS.J)
  const KeyKListener = useKeyPress(keyConstants.KEY_LETTERS.K)
  const EnterKeyListener = useKeyPress(keyConstants.KEY_SPECIAL.enter)

  const MENU_ITEMS_HELP = useMemo(
    () => [
      {
        title: 'Keyboard shortcuts',
        onClick: () =>
          dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.keyboard)),
        hint: [modifierKeyDisplay, '/'],
      },
      {
        title: 'Introduction',
        onClick: () => dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.intro)),
      },
    ],
    []
  )

  const MENU_ITEMS_FEEDBACK = useMemo(
    () => [
      {
        title: 'Send feedback',
        onClick: () =>
          dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.feedback)),
        hint: [modifierKeyDisplay, '.'],
      },
    ],
    []
  )
  const MENU_ITEMS_SOCIAL = useMemo(
    () => [
      {
        title: 'Join us @ Discord',
        onClick: () =>
          window.open(import.meta.env.VITE_DISCORD_SOCIAL_URL, '_blank'),
      },
    ],
    []
  )

  const combinedMenuItems = useCallback(() => {
    // If the Discord Social is defined, show the menu item
    if (
      import.meta.env.VITE_DISCORD_SOCIAL_URL &&
      import.meta.env.VITE_DISCORD_SOCIAL_URL.length > 0
    ) {
      return [MENU_ITEMS_SOCIAL, MENU_ITEMS_HELP, MENU_ITEMS_FEEDBACK]
    }
    return [MENU_ITEMS_HELP, MENU_ITEMS_FEEDBACK]
  }, [])

  useEffect(() => {
    if (focusedItemIndex > -1 && EnterKeyListener) {
      const menuItemsFlatArray = combinedMenuItems().flat(1)
      menuItemsFlatArray[focusedItemIndex].onClick()
    }
  }, [focusedItemIndex, EnterKeyListener])

  useEffect(() => {
    if (
      (ArrowDownListener || KeyJListener) &&
      activeModal === global.ACTIVE_MODAL_MAP.help &&
      focusedItemIndex < combinedMenuItems().flat(1).length - 1
    ) {
      setFocusedItemIndex((prevState) => prevState + 1)
    }
  }, [ArrowDownListener, activeModal, KeyJListener])

  useEffect(() => {
    if (
      (ArrowUpListener || KeyKListener) &&
      activeModal === global.ACTIVE_MODAL_MAP.help &&
      focusedItemIndex > -1
    ) {
      setFocusedItemIndex((prevState) => prevState - 1)
    }
  }, [ArrowUpListener, activeModal, KeyKListener])

  return (
    <S.Layer ref={ref}>
      <S.InnerLayer>
        <S.Container>
          <MenuSection
            data-test-id="help-menu"
            menuItems={combinedMenuItems()}
            focusedItemIndex={focusedItemIndex}
            setFocusedItemIndex={setFocusedItemIndex}
          />
        </S.Container>
      </S.InnerLayer>
    </S.Layer>
  )
})

export default HelpMenu
