import { useMemo } from 'react'
import { push } from 'redux-first-history'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import Menu from 'components/Elements/Menu/Menu'
import { IMenuItemCollection } from 'components/Elements/Menu/MenuTypes'
import * as global from 'constants/globalConstants'
import Routes from 'constants/routesConstants'
import { QiMeatballsH } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectActiveModal, setActiveModal } from 'store/utilsSlice'

import { handleLogout } from './Options/LogoutOption'

const SIZE = 16

const NavigationMore = () => {
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()

  const isOpen = activeModal === global.ACTIVE_MODAL_MAP.navigation

  const handleClose = () => {
    dispatch(setActiveModal(null))
  }

  const handleOpen = () => {
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.navigation))
  }

  const MENU_OPTIONS = useMemo(
    (): IMenuItemCollection => ({
      id: 'more-menu-navigation-options',
      items: [
        {
          id: 'draft-navigation',
          title: 'Drafts',
          onClick: () => {
            dispatch(setActiveModal(null))
            dispatch(push(Routes.DRAFTS))
          },
        },
        {
          id: 'sent-navigation',
          title: 'Sent',
          onClick: () => {
            dispatch(setActiveModal(null))
            dispatch(push(Routes.SENT))
          },
        },
        {
          id: 'archive-navigation',
          title: 'Archive',
          onClick: () => {
            dispatch(setActiveModal(null))
            dispatch(push(Routes.ARCHIVE))
          },
        },
      ],
    }),
    []
  )
  const MENU_ITEMS_GLOBAL = useMemo(
    (): IMenuItemCollection => ({
      id: 'more-menu-navigation-global',
      items: [
        {
          id: 'settings-navigation',
          title: 'Settings',
          onClick: () => {
            handleClose()
            dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.settings))
          },
        },
        {
          id: 'logout',
          title: 'Logout',
          onClick: () => handleLogout(),
        },
      ],
    }),
    []
  )

  return (
    <Menu
      activeModalTag={global.ACTIVE_MODAL_MAP.navigation}
      menuItems={[MENU_OPTIONS, MENU_ITEMS_GLOBAL]}
      handleClose={handleClose}
      triggerButton={
        <CustomIconButton
          ariaControls={isOpen ? 'menu' : undefined}
          ariaExpanded={isOpen || undefined}
          ariaHaspopup="true"
          dataCy="more-menu"
          icon={<QiMeatballsH size={SIZE} />}
          onClick={handleOpen}
          title="More menu"
        />
      }
    />
  )
}

export default NavigationMore
