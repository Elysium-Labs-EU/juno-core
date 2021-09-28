import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CustomButtonText } from './Elements/Buttons'
import ThrashMail from './EmailOptions/ThrashMail'
import * as local from '../constants/emailDetailConstants'
import * as S from './EmailMoreOptionsStyles'
import { useAppDispatch } from '../Store/hooks'
import { LocationObjectType } from './types/globalTypes'

const EmailMoreOptions = ({ messageId, labelURL, labelIds }: { messageId: string, labelURL?: string, labelIds: string[] }) => {
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()
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

EmailMoreOptions.defaultProps = {
  labelURL: null
}

export default EmailMoreOptions
