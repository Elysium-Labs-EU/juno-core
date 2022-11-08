import { useMemo } from 'react'
import { push } from 'redux-first-history'

import * as global from '../../../../constants/globalConstants'
import Routes from '../../../../constants/routes.json'
import { QiMeatballsH } from '../../../../images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { selectActiveModal, setActiveModal } from '../../../../store/utilsSlice'
import CustomIconButton from '../../../Elements/Buttons/CustomIconButton'
import Menu from '../../../Elements/Menu/Menu'
import { IMenuItemCollection } from '../../../Elements/Menu/MenuTypes'
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
          onClick={handleOpen}
          icon={<QiMeatballsH size={SIZE} />}
          title="More menu"
          ariaHaspopup="true"
          ariaControls={isOpen ? 'menu' : undefined}
          ariaExpanded={isOpen || undefined}
        />
      }
    />
  )
}

export default NavigationMore
