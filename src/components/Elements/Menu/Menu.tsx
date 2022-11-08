import { useState } from 'react'
import MenuSectionComponent from './MenuSectionComponent'
import { IMenuItemCollection } from './MenuTypes'
import StyledPopover from '../StyledPopover'
import { useAppSelector } from '../../../store/hooks'
import { selectActiveModal } from '../../../store/utilsSlice'

const Menu = ({
  activeModalTag,
  dataTestId = undefined,
  handleClose,
  menuItems,
  triggerButton,
}: {
  activeModalTag: string
  dataTestId?: string
  handleClose: () => void
  menuItems: Array<IMenuItemCollection>
  triggerButton: JSX.Element
}) => {
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
