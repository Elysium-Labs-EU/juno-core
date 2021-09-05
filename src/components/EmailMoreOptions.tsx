import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { CustomButtonText } from './Elements/Buttons'
import ThrashMail from './EmailOptions/ThrashMail'
import * as local from '../constants/emailDetailConstants'
import * as S from './EmailMoreOptionsStyles'

const EmailMoreOptions = ({ messageId, labelURL, labelIds }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  return (
    <S.Wrapper>
      <CustomButtonText
        className="button option-link text-danger"
        onClick={() =>
          ThrashMail({
            messageId,
            history,
            labelURL,
            labelIds,
            location,
            dispatch,
          })
        }
        label={local.BUTTON_DELETE}
      />
    </S.Wrapper>
  )
}

export default EmailMoreOptions
