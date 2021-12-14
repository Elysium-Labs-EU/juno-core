import React from 'react'
import { FiArchive, FiCheckCircle, FiCornerUpLeft, FiMoreHorizontal } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import ArchiveMail from '../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../EmailDetail/MoreOptions/EmailMoreOptions'
import * as S from './InlineThreadActionsStyles'
import * as todo from '../../constants/todoConstants'
import { CustomIconLink } from '../Elements/Buttons'
import ReplyOverview from '../EmailOptions/ReplyOverview'
import SetToDoMail from '../EmailOptions/SetToDoMail'
import { FindLabelByName } from '../../utils/findLabel'
import { selectStorageLabels } from '../../Store/labelsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { LocationObjectType } from '../types/globalTypes'
import { listRemoveDraft } from '../../Store/draftsSlice'

const InlineThreadActionsDraft = ({
  threadId,
  email
}: {
  threadId: string
  email: any,
}) => {
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()

  console.log(email)

  return (
    <S.Wrapper>
      <S.Inner>
        <CustomIconLink
          onClick={() => dispatch(listRemoveDraft({ threadId }))}
          className="button button-small text_muted option-link"
          icon={<FiArchive />}
          title="Archive"
        />
      </S.Inner>
    </S.Wrapper>
  )
}

export default InlineThreadActionsDraft
