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

const actionKeys = [keyConstants.KEY_ARROW_RIGHT, keyConstants.KEY_SHIFT]

const AppHeaderHelp = () => {
    const activeModal = useAppSelector(selectActiveModal)
    const inSearch = useAppSelector(selectInSearch)
    const [showHelpMenu, setShowHelpMenu] = useState(false)
    const escListenerHelpMenu = useKeyPress(keyConstants.KEY_ESCAPE)

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

    const handleEvent = useCallback(() => {
        setShowHelpMenu((prevState) => !prevState)
    }, [showHelpMenu])
    useMultiKeyPress(handleEvent, actionKeys, inSearch)

    return (
        <>
            <GS.OuterContainer>
                <Header data-test-id="header" />
            </GS.OuterContainer>
            <HelpButton handleEvent={handleEvent} data-test-id="help-button" />
            {showHelpMenu && (
                <HelpMenu />
            )}
        </>
    )
}

export default AppHeaderHelp