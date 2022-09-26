import { useState } from 'react'
import { PopperPlacementType } from '@mui/base'
import { Popper } from '@mui/material'
import useClickOutside from '../../hooks/useClickOutside'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import { QiChevronDown } from '../../images/svgIcons/quillIcons'
import InboxRefresh from './InboxRefreshOption'
import * as GS from '../../styles/globalStyles'

// TODO: Add more options, such as preview latest 4 senders. Archive all, delete all

const InboxSortPopper = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const { ref } = useClickOutside({
    onClickOutside: () => {
      setAnchorEl(null)
      setShowMenu(false)
    },
  })

  const handleSpecificMenu =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
      setShowMenu((prev) => placement !== newPlacement || !prev)
      setPlacement(newPlacement)
    }

  const popperId = showMenu ? 'inbox-sort-popper' : undefined

  return (
    <>
      <CustomIconButton
        icon={<QiChevronDown />}
        onClick={handleSpecificMenu('bottom-start')}
        title="Show more options for inbox sorting"
      />
      <Popper
        id={popperId}
        open={showMenu}
        anchorEl={anchorEl}
        placement={placement}
        ref={ref}
      >
        <GS.MenuPopper>
          <InboxRefresh showButtonLabel />
        </GS.MenuPopper>
      </Popper>
    </>
  )
}

export default InboxSortPopper
