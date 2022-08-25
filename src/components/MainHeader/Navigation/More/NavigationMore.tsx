import { useState } from 'react'
import { push } from 'redux-first-history'
import { Popper } from '@mui/material'
import { FiMoreHorizontal } from 'react-icons/fi'
import * as GS from '../../../../styles/globalStyles'
import * as S from './NavigationMoreStyles'
import * as global from '../../../../constants/globalConstants'
import Routes from '../../../../constants/routes.json'
import { handleLogout } from './Options/LogoutOption'
import {
  MenuSection,
  MenuItemContentMain,
  MenuItemContentSide,
  MenuItem,
} from '../../../Help/HelpStyles'
import { useAppDispatch } from '../../../../store/hooks'
import { setActiveModal } from '../../../../store/utilsSlice'
import CustomIconButton from '../../../Elements/Buttons/CustomIconButton'
import useClickOutside from '../../../../hooks/useClickOutside'

interface IMenuItemOnClick {
  title: string
  onClick: () => void
  hint?: string[]
}

export const MenuItemComponent = ({ item }: { item: IMenuItemOnClick }) => (
  <MenuItem onClick={() => item.onClick()}>
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
}: {
  menuItems: IMenuItemOnClick[][]
}) => (
  <>
    {menuItems.map((section, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <MenuSection key={index}>
        {section.map((item) => (
          <MenuItemComponent key={item.title} item={item} />
        ))}
      </MenuSection>
    ))}
  </>
)

const NavigationMoreMenu = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch()
  const MENU_OPTIONS = [
    { title: 'Drafts', onClick: () => dispatch(push(Routes.DRAFTS)) },
    { title: 'Sent', onClick: () => dispatch(push(Routes.SENT)) },
  ]
  const MENU_ITEMS_GLOBAL = [
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
      // hint: [modifierKeyDisplay, '.'],
    },
  ]

  return (
    <GS.StyledMenu>
      <S.Wrapper>
        <MenuSectionComponent
          data-test-id="more-menu"
          menuItems={[MENU_OPTIONS, MENU_ITEMS_GLOBAL]}
        />
      </S.Wrapper>
    </GS.StyledMenu>
  )
}

const SIZE = 16

const NavigationMore = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { ref } = useClickOutside({
    onClickOutside: () => {
      setAnchorEl(null)
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <CustomIconButton
        onClick={handleClick}
        icon={<FiMoreHorizontal size={SIZE} />}
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
        <NavigationMoreMenu handleClose={handleClose} />
      </Popper>
    </>
  )
}

export default NavigationMore
