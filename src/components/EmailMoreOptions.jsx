import React from 'react'
import { CustomButtonText } from './Elements/Buttons'
import ThrashMail from './EmailOptions/ThrashMail'
import * as local from '../constants/emailDetailConstants'
import * as S from './EmailMoreOptionsStyles'

const EmailMoreOptions = ({ messageId }) => {
  return (
    <S.Wrapper>
      <CustomButtonText
        className="btn option-link text-danger"
        onClick={() => ThrashMail(messageId)}
        label={local.BUTTON_DELETE}
      />
    </S.Wrapper>
  )
}

export default EmailMoreOptions
