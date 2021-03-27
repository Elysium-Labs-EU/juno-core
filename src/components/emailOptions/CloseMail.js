import { useHistory } from 'react-router-dom'
import React from 'react'

function CloseMail() {
  const history = useHistory()

  const returnPage = () => {
    history.go(-1)
    console.log('close')
  }

  return returnPage()
}

export default CloseMail
