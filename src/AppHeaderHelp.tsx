import { useCallback, useEffect } from 'react'
import HelpButton from './components/Help/HelpButton'
import HelpMenu from './components/Help/HelpMenu'
import Header from './components/MainHeader/Header'
import useKeyPress from './hooks/useKeyPress'
import useMultiKeyPress from './hooks/useMultiKeyPress'
import { useAppDispatch, useAppSelector } from './store/hooks'
import {
  selectActiveModal,
  selectInSearch,
  setActiveModal,
} from './store/utilsSlice'
import * as GS from './styles/globalStyles'
import * as keyConstants from './constants/keyConstants'
import useClickOutside from './hooks/useClickOutside'
import * as global from './constants/globalConstants'

const actionKeys = [keyConstants.KEY_ARROW_RIGHT, keyConstants.KEY_SHIFT]

const AppHeaderHelp = () => {
  const dispatch = useAppDispatch()
  const activeModal = useAppSelector(selectActiveModal)
  const inSearch = useAppSelector(selectInSearch)
  const EscapeListener = useKeyPress(keyConstants.KEY_ESCAPE)
  const { ref } = useClickOutside({
    onClickOutside: () => {
      if (activeModal === global.ACTIVE_MODAL_MAP.help) {
        dispatch(setActiveModal(null))
      }
    },
  })

  // Close help menu whenever a ESC is pressed and menu is opened.
  useEffect(() => {
    if (EscapeListener && activeModal === global.ACTIVE_MODAL_MAP.help) {
      dispatch(setActiveModal(null))
    }
  }, [EscapeListener, activeModal])

  const handleEvent = useCallback((passedActiveModal: string | null) => {
    console.log(passedActiveModal)
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.help))
  }, [])
  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <>
      <GS.OuterContainer>
        <Header data-test-id="header" />
      </GS.OuterContainer>
      <HelpButton handleEvent={handleEvent} data-test-id="help-button" activeModal={activeModal} />
      {activeModal === global.ACTIVE_MODAL_MAP.help && <HelpMenu ref={ref} />}
    </>
  )
}

export default AppHeaderHelp
