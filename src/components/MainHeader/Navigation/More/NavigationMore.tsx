import { useCallback, useEffect, useMemo, useState } from 'react'
import { push } from 'redux-first-history'

import { Popper } from '@mui/material'

import * as global from '../../../../constants/globalConstants'
import * as keyConstants from '../../../../constants/keyConstants'
import Routes from '../../../../constants/routes.json'
import useClickOutside from '../../../../hooks/useClickOutside'
import useKeyPress from '../../../../hooks/useKeyPress'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { selectActiveModal, setActiveModal } from '../../../../store/utilsSlice'
import * as GS from '../../../../styles/globalStyles'
import CustomIconButton from '../../../Elements/Buttons/CustomIconButton'
import {
  MenuItem,
  MenuItemContentMain,
  MenuItemContentSide,
  MenuSection,
} from '../../../Help/HelpStyles'
import * as S from './NavigationMoreStyles'
import { handleLogout } from './Options/LogoutOption'
import { QiMeatballsH } from '../../../../images/svgIcons/quillIcons'

interface IMenuItemOnClick {
  title: string
  onClick: () => void
  hint?: string[]
}

export const MenuItemComponent = ({
  item,
  absoluteIndex,
  focusedItemIndex = undefined,
  setFocusedItemIndex = undefined,
}: {
  item: IMenuItemOnClick
  absoluteIndex: number
  focusedItemIndex?: number
  setFocusedItemIndex?: (newIndex: number) => void
}) => (
  <MenuItem
    onClick={() => item.onClick()}
    onFocus={
      setFocusedItemIndex ? () => setFocusedItemIndex(absoluteIndex) : undefined
    }
    onMouseOver={
      setFocusedItemIndex ? () => setFocusedItemIndex(absoluteIndex) : undefined
    }
    isFocused={focusedItemIndex === absoluteIndex}
  >
    <MenuItemContentMain data-test-id="item-title">
      {item.title}
    </MenuItemContentMain>
    {item?.hint && (
      <MenuItemContentSide data-test-id="item-hint">
        {item.hint.map((it) => (
          <span key={it}>{it}</span>
        ))}
      </MenuItemContentSide>
    )}
  </MenuItem>
)

export const MenuSectionComponent = ({
  menuItems,
  focusedItemIndex = undefined,
  setFocusedItemIndex = undefined,
}: {
  menuItems: IMenuItemOnClick[][]
  focusedItemIndex?: number
  setFocusedItemIndex?: (newIndex: number) => void
}) => {
  const menuItemsFlatArray = menuItems.flat(1)
  return (
    <>
      {menuItems.map((section, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <MenuSection key={index}>
          {section.map((item) => {
            const absoluteIndex = menuItemsFlatArray.findIndex(
              (mItem) => mItem.title === item.title
            )
            return (
              <MenuItemComponent
                key={item.title}
                item={item}
                absoluteIndex={absoluteIndex}
                focusedItemIndex={focusedItemIndex}
                setFocusedItemIndex={setFocusedItemIndex}
              />
            )
          })}
        </MenuSection>
      ))}
    </>
  )
}

const NavigationMoreMenu = ({
  handleClose,
  activeModal,
}: {
  handleClose: () => void
  activeModal: string | null
}) => {
  const dispatch = useAppDispatch()
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1)
  const ArrowDownListener = useKeyPress(keyConstants.KEY_ARROW_DOWN)
  const ArrowUpListener = useKeyPress(keyConstants.KEY_ARROW_UP)
  const KeyJListener = useKeyPress(keyConstants.KEY_J)
  const KeyKListener = useKeyPress(keyConstants.KEY_K)
  const EnterKeyListener = useKeyPress(keyConstants.KEY_ENTER)

  const MENU_OPTIONS = useMemo(
    () => [
      {
        title: 'Drafts',
        onClick: () => {
          dispatch(setActiveModal(null))
          dispatch(push(Routes.DRAFTS))
        },
      },
      {
        title: 'Sent',
        onClick: () => {
          dispatch(setActiveModal(null))
          dispatch(push(Routes.SENT))
        },
      },
      {
        title: 'Archive',
        onClick: () => {
          dispatch(setActiveModal(null))
          dispatch(push(Routes.ARCHIVE))
        },
      },
    ],
    []
  )
  const MENU_ITEMS_GLOBAL = useMemo(
    () => [
      {
        title: 'Settings',
        onClick: () => {
          handleClose()
          dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.settings))
        },
        // hint: [modifierKeyDisplay, '.'],
      },
      {
        title: 'Logout',
        onClick: () => handleLogout(),
      },
    ],
    []
  )

  useEffect(() => {
    if (focusedItemIndex > -1 && EnterKeyListener) {
      const menuItemsFlatArray = [MENU_OPTIONS, MENU_ITEMS_GLOBAL].flat(1)
      menuItemsFlatArray[focusedItemIndex].onClick()
    }
  }, [focusedItemIndex, EnterKeyListener])

  useEffect(() => {
    if (
      (ArrowDownListener || KeyJListener) &&
      activeModal === global.ACTIVE_MODAL_MAP.navigation &&
      focusedItemIndex < [MENU_OPTIONS, MENU_ITEMS_GLOBAL].flat(1).length - 1
    ) {
      setFocusedItemIndex((prevState) => prevState + 1)
    }
  }, [ArrowDownListener, activeModal, KeyJListener])

  useEffect(() => {
    if (
      (ArrowUpListener || KeyKListener) &&
      activeModal === global.ACTIVE_MODAL_MAP.navigation &&
      focusedItemIndex > -1
    ) {
      setFocusedItemIndex((prevState) => prevState - 1)
    }
  }, [ArrowUpListener, activeModal, KeyKListener])

  return (
    <GS.StyledMenu>
      <S.Wrapper>
        <MenuSectionComponent
          setFocusedItemIndex={setFocusedItemIndex}
          focusedItemIndex={focusedItemIndex}
          data-test-id="more-menu"
          menuItems={[MENU_OPTIONS, MENU_ITEMS_GLOBAL]}
        />
      </S.Wrapper>
    </GS.StyledMenu>
  )
}

const SIZE = 16

const NavigationMore = () => {
  const activeModal = useAppSelector(selectActiveModal)
  const EscapeListener = useKeyPress(keyConstants.KEY_ESCAPE)
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClose = useCallback(() => {
    setAnchorEl(null)
    dispatch(setActiveModal(null))
  }, [])

  const { ref } = useClickOutside({
    onClickOutside: handleClose,
  })
  // Close help menu whenever a ESC is pressed and menu is opened.
  useEffect(() => {
    if (EscapeListener && activeModal === global.ACTIVE_MODAL_MAP.navigation) {
      handleClose()
    }
  }, [EscapeListener, activeModal])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.navigation))
  }

  const memoizedMenu = useMemo(
    () => (
      <NavigationMoreMenu handleClose={handleClose} activeModal={activeModal} />
    ),
    [activeModal]
  )

  return (
    <>
      <CustomIconButton
        onClick={handleClick}
        icon={<QiMeatballsH size={SIZE} />}
        title="More menu"
      />
      <Popper
        id="navigation-more"
        open={open}
        anchorEl={anchorEl}
        ref={ref}
        placement="bottom-end"
        style={{ zIndex: `var(--z-index-popover)` }}
      >
        {memoizedMenu}
      </Popper>
    </>
  )
}

export default NavigationMore
