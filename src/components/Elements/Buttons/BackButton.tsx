import React from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { goBack, push } from 'redux-first-history'
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
    !isFocused && !isSorting && dispatch(goBack())
    Object.keys(composeEmail).length > 0 && cleanUpComposerAndDraft()
    if (isFocused) {
      dispatch(setIsFocused(false))
      dispatch(push(Routes.HOME))
    }
    if (isSorting) {
      dispatch(setIsSorting(false))
      dispatch(push(Routes.INBOX))
    }
  }

  return (
    <CustomButton
      onClick={navigateBack}
      label={global.BUTTON_BACK}
      suppressed
      icon={<FiChevronLeft />}
    />
  )
}

export default BackButton

BackButton.defaultProps = {
  isFocused: false,
  isSorting: false,
}
