import React from 'react'
import CustomButton from '../../Elements/Buttons/CustomButton'
import thrashMail from '../../EmailOptions/ThrashMail'
import * as local from '../../../constants/emailDetailConstants'
import * as S from './EmailMoreOptionsStyles'
import { useAppDispatch } from '../../../Store/hooks'
import { LabelIdName } from '../../../Store/labelsTypes'
import filterIllegalLabels from '../../../utils/filterIllegalLabels'

interface IEmailMoreOptions {
  messageId: string
  labelIds: string[]
  storageLabels: LabelIdName[]
}

const EmailMoreOptions = ({ messageId, labelIds, storageLabels }: IEmailMoreOptions) => {
  const dispatch = useAppDispatch()
  const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)

  return (
    <S.Wrapper>
      <CustomButton
        onClick={() =>
          thrashMail({
            messageId,
            labelIds: onlyLegalLabels,
            dispatch,
          })
        }
        label={local.BUTTON_DELETE}
      />
    </S.Wrapper>
  )
}

export default EmailMoreOptions
