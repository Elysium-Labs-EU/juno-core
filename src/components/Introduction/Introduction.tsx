import CustomButton from 'components/Elements/Buttons/CustomButton'
import CustomModal from 'components/Elements/Dialog/CustomDialog'
import { KeyCombinationSection } from 'components/Help/KeyboardCombos/KeyboardCombos'
import StrictFlow from 'components/Settings/General/StrictFlow/StrictFlow'
import { ACTIVE_MODAL_MAP } from 'constants/globalConstants'
import { GLOBAL_KEY_SHORTCUTS } from 'constants/keycomboConstants'
import { QiArrowRight, QiCommand } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import { selectActiveModal, setActiveModal } from 'store/utilsSlice'

import {
  DIALOG_HEADER,
  DIALOG_HEADER_INTRODUCTION,
  DIALOG_CONTENT_INTRODUCTION,
  DIALOG_HEADER_PRIVACY,
  DIALOG_CONTENT_PRIVACY,
  DIALOG_CONTENT_PRIVACY_1,
  CONFIRM_BUTTON,
  DIALOG_HEADER_CMD_K_SEARCH,
  DIALOG_CONTENT_CMD_K_SEARCH,
} from './IntroductionConstants'
import * as S from './IntroductionStyles'

const Introduction = () => {
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(updateSettingsLabel({ key: 'showIntroduction', value: false }))
    dispatch(setActiveModal(null))
  }

  const openKeyboardShortcuts = () => {
    dispatch(setActiveModal(ACTIVE_MODAL_MAP.keyboard))
  }

  const selectedShortcut = GLOBAL_KEY_SHORTCUTS.find(
    (shortcut) => shortcut.title === 'Open Command Menu & Search'
  )

  return (
    <CustomModal
      customOnClose={handleClose}
      modalAriaLabel="introduction"
      modalTitle={DIALOG_HEADER}
      open={activeModal === ACTIVE_MODAL_MAP.intro}
    >
      <>
        <S.InnerContent>
          <div>
            <S.DialogSubHeader>{DIALOG_HEADER_INTRODUCTION}</S.DialogSubHeader>
            <p>{DIALOG_CONTENT_INTRODUCTION}</p>
            <StrictFlow />
            <S.DialogSubHeader>{DIALOG_HEADER_CMD_K_SEARCH}</S.DialogSubHeader>
            <p>{DIALOG_CONTENT_CMD_K_SEARCH}</p>
            <S.CMDKContainer>
              {selectedShortcut ? (
                <KeyCombinationSection combo={selectedShortcut} />
              ) : null}
            </S.CMDKContainer>
            <S.DialogSubHeader>{DIALOG_HEADER_PRIVACY}</S.DialogSubHeader>
            <p>{DIALOG_CONTENT_PRIVACY}</p>
            <p>{DIALOG_CONTENT_PRIVACY_1}</p>
          </div>
        </S.InnerContent>
        <S.ButtonContainer>
          <CustomButton
            icon={<QiCommand />}
            label="View keyboard shortcuts"
            onClick={openKeyboardShortcuts}
            suppressed
            title="Show keyboard shortcuts"
          />
          <CustomButton
            attention
            icon={<QiArrowRight />}
            label={CONFIRM_BUTTON}
            onClick={handleClose}
            title="Close Introduction"
          />
        </S.ButtonContainer>
      </>
    </CustomModal>
  )
}

export default Introduction
