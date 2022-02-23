import { ChangeEvent, useEffect, useState } from 'react'
import { FiArrowRightCircle } from 'react-icons/fi'
import { isEmpty } from 'lodash'
import Dialog from '@mui/material/Dialog'
import * as S from './IntroductionStyles'
import * as global from '../../constants/globalConstants'
import CustomButton from '../Elements/Buttons/CustomButton'
import setCookie from '../../utils/Cookie/setCookie'
import getCookie from '../../utils/Cookie/getCookie'
import { selectLabelIds, selectLoadedInbox } from '../../Store/labelsSlice'
import { useAppSelector } from '../../Store/hooks'
import { selectEmailList } from '../../Store/emailListSlice'
import getEmailListIndex from '../../utils/getEmailListIndex'

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
  'Juno does not store any of your information - nada! It only serves as an interaction layer between you and your Gmail.'
const CONFIRM_BUTTON = "Let's go"

const Introduction = () => {
  const [open, setOpen] = useState(false)
  const labelIds = useAppSelector(selectLabelIds)
  const emailList = useAppSelector(selectEmailList)
  const cookieValue = getCookie(global.INTRODUCTION_TOKEN)
  const loadedInbox = useAppSelector(selectLoadedInbox)

  const toDoBoxLoaded = labelIds.some(
    (val) => loadedInbox.flat(1).indexOf(val) > -1
  )

  useEffect(() => {
    if (toDoBoxLoaded && emailList && labelIds) {
      const toDoBox = emailList[getEmailListIndex({ labelIds, emailList })]
      if (isEmpty(cookieValue) && isEmpty(toDoBox)) {
        setOpen(true)
      }
    }
  }, [toDoBoxLoaded, cookieValue, emailList, labelIds])

  const handleCloseDefault = (event: ChangeEvent<{}>, reason: string) => {
    if (reason === 'backdropClick') {
      return null
    }
    if (reason === 'escapeKeyDown') {
      setCookie(global.INTRODUCTION_TOKEN, { status: 'completed' }, 30)
      setOpen(false)
      return null
    }
    return null
  }

  const handleClose = () => {
    setCookie(global.INTRODUCTION_TOKEN, { status: 'completed' }, 30)
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseDefault}
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
        />
      </S.DialogContent>
    </Dialog>
  )
}

export default Introduction
