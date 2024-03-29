import { useState } from 'react'

import StyledPopover from 'components/Elements/StyledPopover'
import { useAppSelector } from 'store/hooks'
import { selectActiveModal } from 'store/utilsSlice'

import MenuSectionComponent from './MenuSectionComponent'
import type { IMenu } from './MenuTypes'

const Menu = ({
  activeModalTag,
  dataTestId = undefined,
  handleClose,
  menuItems,
  triggerButton,
}: IMenu) => {
  const [focusedItemIndex, setFocusedItemIndex] = useState(0)
  const activeModal = useAppSelector(selectActiveModal)

  // Reset the Redux state to null when the menu is closed. This is necessary to enable keyboard shortcuts to work properly.
  const handleOnOpenChange = (isOpen: boolean) => {
    if (!isOpen && (activeModalTag === activeModal || activeModal === null)) {
      handleClose()
    }
  }

  return (
    <StyledPopover
      triggerButton={triggerButton}
      onOpenChange={handleOnOpenChange}
    >
      <MenuSectionComponent
        activeModalTag={activeModalTag}
        data-test-id={dataTestId}
        focusedItemIndex={focusedItemIndex}
        menuItems={menuItems}
        setFocusedItemIndex={setFocusedItemIndex}
      />
    </StyledPopover>
  )
}

export default Menu
