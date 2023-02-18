import CustomButton from 'components/Elements/Buttons/CustomButton'
import CustomModal from 'components/Elements/Modal/CustomModal'
import StrictFlow from 'components/Settings/General/StrictFlow/StrictFlow'
import * as global from 'constants/globalConstants'
import { QiArrowRight, QiCommand } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import {
  selectActiveModal,
  selectSettingsLabelId,
  setActiveModal,
} from 'store/utilsSlice'

import * as S from './IntroductionStyles'

const DIALOG_HEADER = 'Welcome to Juno'
const DIALOG_CONTENT_DEVELOPMENT =
  'This app is still in development, some things might break or not be there yet - and is looking for your help. See for more information on the settings page.'
const DIALOG_HEADER_INTRODUCTION = 'How it works'
const DIALOG_CONTENT_INTRODUCTION_1 =
  'Your homepage is your To Do list of emails. You can populate it by marking emails from your Inbox as To Do.'
const DIALOG_CONTENT_INTRODUCTION_2 =
  'On top of the To Do, there are two buttons, one for going through all your To-Do and one for going through all your Inbox emails. You should give it a shot. Also, you can navigate between pages via the top-right menu.'
const DIALOG_HEADER_PRIVACY = 'Privacy'
const DIALOG_CONTENT_PRIVACY =
  'Juno does not store any of your personal information, outside an authorization token. It only serves as an interaction layer between you and your Gmail!'
const DIALOG_CONTENT_PRIVACY_1 =
  'We have Sentry (bug/error tracking software) running by default, this software helps us understand what is breaking when it does. You can opt out of this by switching the setting in Settings.'
const CONFIRM_BUTTON = "Let's go"

const Introduction = () => {
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(
      updateSettingsLabel({ settingsLabelId, showIntroduction: 'false' })
    )
  }

  const openKeyboardShortcuts = () => {
    dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.keyboard))
  }

  return (
    <CustomModal
      open={activeModal === global.ACTIVE_MODAL_MAP.intro}
      modalTitle={DIALOG_HEADER}
      modalAriaLabel="introduction"
      additionalOnClose={handleClose}
    >
      <>
        <S.InnerContent>
          <p>{DIALOG_CONTENT_DEVELOPMENT}</p>
          <S.DialogSubHeader>{DIALOG_HEADER_INTRODUCTION}</S.DialogSubHeader>
          <p>{DIALOG_CONTENT_INTRODUCTION_1}</p>
          <p>{DIALOG_CONTENT_INTRODUCTION_2}</p>
          <StrictFlow />
          <S.DialogSubHeader>{DIALOG_HEADER_PRIVACY}</S.DialogSubHeader>
          <p>{DIALOG_CONTENT_PRIVACY}</p>
          <p>{DIALOG_CONTENT_PRIVACY_1}</p>
        </S.InnerContent>
        <S.ButtonContainer>
          <CustomButton
            onClick={openKeyboardShortcuts}
            suppressed
            icon={<QiCommand />}
            label="View keyboard shortcuts"
            title="Show keyboard shortcuts"
          />
          <CustomButton
            onClick={handleClose}
            label={CONFIRM_BUTTON}
            icon={<QiArrowRight />}
            title="Close Introduction"
            style={{
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-white)',
            }}
          />
        </S.ButtonContainer>
      </>
    </CustomModal>
  )
}

export default Introduction
