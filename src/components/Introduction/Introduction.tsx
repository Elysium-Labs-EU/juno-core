import { FiArrowRightCircle } from 'react-icons/fi'
import Dialog from '@mui/material/Dialog'
import * as S from './IntroductionStyles'
import CustomButton from '../Elements/Buttons/CustomButton'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import updateSettingsLabel from '../../utils/settings/updateSettingsLabel'
import {
  selectSettingsLabelId,
  selectShowIntroduction,
  setShowIntroduction,
} from '../../store/utilsSlice'

const DIALOG_HEADER = 'Welcome to Juno'
const DIALOG_CONTENT_DEVELOPMENT =
  'This app is still in development, some things might break or not be there yet - and is looking for your help. See for more information on the settings page.'
const DIALOG_HEADER_INTRODUCTION = 'How it works'
const DIALOG_CONTENT_INTRODUCTION_1 =
  'Your homepage is your To Do list of emails. You can populate it by marking emails from your Inbox as To Do.'
const DIALOG_CONTENT_INTRODUCTION_2 =
  'On top of the Inbox and To Do, there is a special button you should give it a shot. Also, you can navigate between pages via the top-right menu.'
const DIALOG_HEADER_PRIVACY = 'Privacy'
const DIALOG_CONTENT_PRIVACY =
  'Juno does not store any of your personal information - nada! It only serves as an interaction layer between you and your Gmail.'
const CONFIRM_BUTTON = "Let's go"

const Introduction = () => {
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const showIntroduction = useAppSelector(selectShowIntroduction)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    updateSettingsLabel({ settingsLabelId, showIntroduction: false })
    dispatch(setShowIntroduction(false))
  }

  return (
    <Dialog
      open={showIntroduction}
      onClose={handleClose}
      aria-labelledby="introduction-dialog"
      aria-describedby="alert-dialog-for-first-users"
    >
      <S.DialogContent>
        <S.DialogHeader>{DIALOG_HEADER}</S.DialogHeader>
        <S.InnerContent>
          <p>{DIALOG_CONTENT_DEVELOPMENT}</p>
          <S.DialogSubHeader>{DIALOG_HEADER_INTRODUCTION}</S.DialogSubHeader>
          <p>{DIALOG_CONTENT_INTRODUCTION_1}</p>
          <p>{DIALOG_CONTENT_INTRODUCTION_2}</p>
          <S.DialogSubHeader>{DIALOG_HEADER_PRIVACY}</S.DialogSubHeader>
          <p>{DIALOG_CONTENT_PRIVACY}</p>
        </S.InnerContent>
        <CustomButton
          onClick={handleClose}
          label={CONFIRM_BUTTON}
          icon={<FiArrowRightCircle />}
          title="Close Introduction"
        />
      </S.DialogContent>
    </Dialog>
  )
}

export default Introduction
