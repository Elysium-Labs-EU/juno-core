import React from 'react'
import { go, push } from 'redux-first-history'
import CustomButton from './CustomButton'
import * as global from '../../../constants/globalConstants'
import Routes from '../../../constants/routes.json'
import { setIsFocused, setIsSorting } from '../../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { resetComposeEmail, selectComposeEmail } from '../../../Store/composeSlice'
import { resetDraftDetails } from '../../../Store/draftsSlice'

interface BackButtonType {
  isFocused?: boolean
  isSorting?: boolean
}

const BackButton = (props: BackButtonType) => {
  const { isFocused, isSorting } = props
  const dispatch = useAppDispatch()
  const composeEmail = useAppSelector(selectComposeEmail)

  const cleanUpComposerAndDraft = () => {
    dispatch(resetComposeEmail())
    dispatch(resetDraftDetails())
  }

  const navigateBack = () => {
    !isFocused && !isSorting && dispatch(go(-1))
    if (isFocused) {
      dispatch(setIsFocused(false))
      dispatch(push(Routes.HOME))
      return
    }
    if (isSorting) {
      dispatch(setIsSorting(false))
      dispatch(push(Routes.INBOX))
      return
    }
    Object.keys(composeEmail).length > 0 && cleanUpComposerAndDraft()
  }

  return (
    <CustomButton
      onClick={navigateBack}
      label={global.BUTTON_BACK}
      className="juno-button juno-button-small juno-button-light"
    />
  )
}

export default BackButton

BackButton.defaultProps = {
  isFocused: false,
  isSorting: false,
}
