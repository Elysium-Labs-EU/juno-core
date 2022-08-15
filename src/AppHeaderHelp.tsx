import { useState, useCallback, useEffect } from 'react'
import HelpButton from './components/Help/HelpButton'
import HelpMenu from './components/Help/HelpMenu'
import Header from './components/MainHeader/Header'
import useKeyPress from './hooks/useKeyPress'
import useMultiKeyPress from './hooks/useMultiKeyPress'
import { useAppSelector } from './store/hooks'
import { selectActiveModal, selectInSearch } from './store/utilsSlice'
import * as GS from './styles/globalStyles'
import * as keyConstants from './constants/keyConstants'
import useClickOutside from './hooks/useClickOutside'

const actionKeys = [keyConstants.KEY_ARROW_RIGHT, keyConstants.KEY_SHIFT]

const AppHeaderHelp = () => {
  const [showHelpMenu, setShowHelpMenu] = useState(false)
  const activeModal = useAppSelector(selectActiveModal)
  const inSearch = useAppSelector(selectInSearch)
  const escListenerHelpMenu = useKeyPress(keyConstants.KEY_ESCAPE)
  const { ref } = useClickOutside({
    onClickOutside: () => setShowHelpMenu(false),
  })

  const closeHelpMenu = useCallback(() => {
    setShowHelpMenu(false)
  }, [])

  // Close help menu whenever a modal is opened.
  useEffect(() => {
    if (activeModal) {
      closeHelpMenu()
    }
  }, [activeModal])

  // Close help menu whenever a ESC is pressed and menu is opened.
  useEffect(() => {
    if (escListenerHelpMenu && showHelpMenu) {
      closeHelpMenu()
    }
  }, [escListenerHelpMenu, showHelpMenu])

  const handleEvent = () => {
    setShowHelpMenu((prevState) => !prevState)
  }
  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <>
      <GS.OuterContainer>
        <Header data-test-id="header" />
      </GS.OuterContainer>
      <HelpButton handleEvent={handleEvent} data-test-id="help-button" />
      {showHelpMenu && <HelpMenu ref={ref} />}
    </>
  )
}

export default AppHeaderHelp
