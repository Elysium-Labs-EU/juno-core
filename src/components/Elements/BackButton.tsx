import React from 'react'
import { go } from 'redux-first-history'
import { CustomButtonText } from './Buttons'
import * as global from '../../constants/globalConstants'
import { setIsFocused, setIsSorting } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { resetComposeEmail, selectComposeEmail } from '../../Store/composeSlice'
import { resetDraftDetails } from '../../Store/draftsSlice'

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
    dispatch(go(-1))
    isFocused && dispatch(setIsFocused(false))
    isSorting && dispatch(setIsSorting(false))
    Object.keys(composeEmail).length > 0 && cleanUpComposerAndDraft()
  }

  return (
    <CustomButtonText
      onClick={navigateBack}
      label={global.BUTTON_BACK}
      className="button button-small button-light"
    />
  )
}

export default BackButton

BackButton.defaultProps = {
  isFocused: false,
  isSorting: false,
}
