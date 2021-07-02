import React from 'react'
import { useHistory } from 'react-router-dom'
import { CustomButtonText } from './Elements/Buttons'
import * as global from '../constants/globalConstants'

function BackButton() {
  const history = useHistory()

  const navigateBack = (number = -1) => {
    history.go(number)
  }

  return (
    <CustomButtonText
      onClick={navigateBack}
      label={global.BUTTON_BACK}
      className="btn btn-sm btn-light"
    />
  )
}

export default BackButton
