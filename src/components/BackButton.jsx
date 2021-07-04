import React from 'react'
import { useHistory } from 'react-router-dom'
import { CustomButtonText } from './Elements/Buttons'
import * as global from '../constants/globalConstants'

function BackButton() {
  const history = useHistory()

  const navigateBack = () => {
    history.go(-1)
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
