import CustomButton from 'components/Elements/Buttons/CustomButton'
import CustomModal from 'components/Elements/Dialog/CustomDialog'
import StrictFlow from 'components/Settings/General/StrictFlow/StrictFlow'
import { ACTIVE_MODAL_MAP } from 'constants/globalConstants'
import { QiArrowRight, QiCommand } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import { selectActiveModal, setActiveModal } from 'store/utilsSlice'

import {
  DIALOG_HEADER,
  DIALOG_CONTENT_DEVELOPMENT,
  DIALOG_HEADER_INTRODUCTION,
  DIALOG_CONTENT_INTRODUCTION,
  DIALOG_HEADER_PRIVACY,
  DIALOG_CONTENT_PRIVACY,
  DIALOG_CONTENT_PRIVACY_1,
  CONFIRM_BUTTON,
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

  return (
    <CustomModal
      customOnClose={handleClose}
      modalAriaLabel="introduction"
      modalTitle={DIALOG_HEADER}
      open={activeModal === ACTIVE_MODAL_MAP.intro}
    >
      <>
        <S.InnerContent>
          <p>{DIALOG_CONTENT_DEVELOPMENT}</p>
          <S.DialogSubHeader>{DIALOG_HEADER_INTRODUCTION}</S.DialogSubHeader>
          <p>{DIALOG_CONTENT_INTRODUCTION}</p>
          <StrictFlow />
          <S.DialogSubHeader>{DIALOG_HEADER_PRIVACY}</S.DialogSubHeader>
          <p>{DIALOG_CONTENT_PRIVACY}</p>
          <p>{DIALOG_CONTENT_PRIVACY_1}</p>
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
