import React from 'react'
import { FiDelete } from 'react-icons/fi'
import * as S from './InlineThreadActionsStyles'
import { CustomIconLink } from '../Elements/Buttons'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import DeleteDraft from '../EmailOptions/DeleteDraft'
import { selectEmailList } from '../../Store/emailListSlice'
import emailListFilteredByLabel from '../../utils/emailListFilteredByLabel'
import { IEmailListObject } from '../../Store/emailListTypes'
import { selectDraft } from '../../Store/draftsSlice'

const InlineThreadActionsDraft = ({ threadId }: { threadId: string }) => {
  const dispatch = useAppDispatch()
  const emailList = useAppSelector(selectEmailList)
  const draftList = useAppSelector(selectDraft)

  const copyCurrentEmailList: IEmailListObject[] = emailListFilteredByLabel({
    emailList,
    labelIds: ['DRAFT'],
  })

  const draftId = draftList.length > 0 && draftList.find((draft) => draft.message.threadId === threadId)?.id

  return (
    <S.Wrapper>
      <S.Inner>
        <CustomIconLink
          onClick={() => DeleteDraft({ threadId, dispatch, copyCurrentEmailList, draftId })}
          className="juno-button juno-button-small text_muted option-link"
          icon={<FiDelete />}
          title="Discard Draft"
        />
      </S.Inner>
    </S.Wrapper>
  )
}

export default InlineThreadActionsDraft
