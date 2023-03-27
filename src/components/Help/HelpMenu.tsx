import { useCallback, useMemo, useRef } from 'react'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import Menu from 'components/Elements/Menu/Menu'
import * as S from 'components/Elements/Menu/MenuStyles'
import type { IMenuItemCollection } from 'components/Elements/Menu/MenuTypes'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiInfo } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectActiveModal,
  selectInSearch,
  setActiveModal,
} from 'store/utilsSlice'
import { modifierKeyDisplay, setModifierKey } from 'utils/setModifierKey'

const SIZE = 16
const customStyles = {
  background: 'var(--color-white)',
  border: '1px solid var(--color-neutral-200)',
  borderRadius: 'var(--radius-m)',
  boxShadow: 'var(--box-shadow-low)',
  lineHeight: 1,
  // TODO: Check these values
  padding: '10px 12px',
}

const HelpMenu = () => {
  const dispatch = useAppDispatch()
  const activeModal = useAppSelector(selectActiveModal)
  const inSearch = useAppSelector(selectInSearch)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const isOpen = activeModal === global.ACTIVE_MODAL_MAP.help

  const MENU_ITEMS_HELP = useMemo((): IMenuItemCollection => {
    const DOCUMENTATION_URL = import.meta.env.VITE_DOCUMENTATION_URL

    return {
      id: 'help-menu-keyboard-shortcuts',
      items: [
        {
          id: 'keyboard-shortcuts',
          title: 'Keyboard shortcuts',
          onClick: () =>
            dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.keyboard)),
          hint: [modifierKeyDisplay, '/'],
        },
        {
          id: 'introduction',
          title: 'Introduction',
          onClick: () =>
            dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.intro)),
        },
        DOCUMENTATION_URL
          ? {
              id: 'documentation',
              title: 'Documentation',
              onClick: () => window.open(DOCUMENTATION_URL, '_blank'),
            }
          : null,
      ],
    }
  }, [])

  // const MENU_ITEMS_FEEDBACK = useMemo(
  //   (): IMenuItemCollection => ({
  //     id: 'help-menu-feedback',
  //     items: [
  //       {
  //         id: 'send-feedback',
  //         title: 'Send feedback',
  //         onClick: () =>
  //           dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.feedback)),
  //         hint: [modifierKeyDisplay, '.'],
  //       },
  //     ],
  //   }),
  //   []
  // )
  const MENU_ITEMS_SOCIAL = useMemo((): IMenuItemCollection | undefined => {
    const DISCORD_URL = import.meta.env.VITE_DISCORD_SOCIAL_URL
    return DISCORD_URL
      ? {
          id: 'help-menu-social',
          items: [
            {
              id: 'discord-social',
              title: 'Join us @ Discord',
              onClick: () => window.open(DISCORD_URL, '_blank'),
            },
          ],
        }
      : undefined
  }, [])

  const combinedMenuItems = useCallback(() => {
    if (MENU_ITEMS_SOCIAL) {
      return [MENU_ITEMS_SOCIAL, MENU_ITEMS_HELP]
    }
    return [MENU_ITEMS_HELP]
  }, [])

  const handleOpenHelpMenu = useCallback(() => {
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.help))
  }, [])
  useKeyboardShortcut({
    key: keyConstants.KEY_ARROWS.right,
    modifierKey: keyConstants.KEY_SPECIAL.shift,
    handleEvent: handleOpenHelpMenu,
    isDisabled: inSearch || !activeModal,
  })

  const handleClose = () => {
    buttonRef.current!.focus()
    dispatch(setActiveModal(null))
  }

  const handleShowKeyboardShortcuts = useCallback(() => {
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.keyboard))
  }, [dispatch])

  useKeyboardShortcut({
    handleEvent: handleShowKeyboardShortcuts,
    modifierKey: setModifierKey,
    key: keyConstants.KEY_SPECIAL.forwardSlash,
    isDisabled: inSearch,
  })

  // const handleShowFeedback = useCallback(() => {
  //   dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.feedback))
  // }, [dispatch])

  // useKeyboardShortcut({
  //   handleEvent: handleShowFeedback,
  //   modifierKey: setModifierKey,
  //   key: keyConstants.KEY_SPECIAL.dot,
  //   isDisabled: inSearch,
  // })

  return (
    <Menu
      activeModalTag={global.ACTIVE_MODAL_MAP.help}
      handleClose={handleClose}
      menuItems={combinedMenuItems()}
      triggerButton={
        <S.StartButtonWrapper>
          <CustomIconButton
            ariaControls={isOpen ? 'menu' : undefined}
            ariaExpanded={isOpen || undefined}
            ariaHaspopup="true"
            icon={<QiInfo size={SIZE} />}
            onClick={handleOpenHelpMenu}
            ref={buttonRef}
            style={customStyles}
            title="More menu"
          />
        </S.StartButtonWrapper>
      }
    />
  )
}

export default HelpMenu
