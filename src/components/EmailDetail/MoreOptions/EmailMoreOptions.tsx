import React from 'react'
import { CustomButtonText } from '../../Elements/Buttons'
import thrashMail from '../../EmailOptions/ThrashMail'
import * as local from '../../../constants/emailDetailConstants'
import * as S from './EmailMoreOptionsStyles'
import { useAppDispatch } from '../../../Store/hooks'
import { LabelIdName } from '../../../Store/labelsTypes'
import filterIllegalLabels from '../../../utils/filterIllegalLabels'

const EmailMoreOptions = ({ messageId, labelIds, storageLabels }: { messageId: string; labelIds: string[], storageLabels: LabelIdName[] }) => {
  const dispatch = useAppDispatch()
  const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)

  return (
    <S.Wrapper>
      <CustomButtonText
        className="juno-button option-link text-danger"
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
