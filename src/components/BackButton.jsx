import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CustomButtonText } from './Elements/Buttons'
import * as global from '../constants/globalConstants'
import { setIsFocused, setIsSorting } from '../Store/emailListSlice'

const BackButton = (props) => {
  const { isFocused, isSorting } = props
  const dispatch = useDispatch()
  const history = useHistory()

  const navigateBack = () => {
    history.go(-1)
    isFocused && dispatch(setIsFocused(false))
    isSorting && dispatch(setIsSorting(false))
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
