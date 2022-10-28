import { useEffect, useState } from 'react'

import * as global from '../../../constants/globalConstants'
import {
  selectEmailList,
  selectSelectedEmails,
} from '../../../store/emailListSlice'
import { useAppSelector } from '../../../store/hooks'
import { selectLabelIds } from '../../../store/labelsSlice'
import * as GS from '../../../styles/globalStyles'
import deduplicateItems from '../../../utils/deduplicateItems'
import getRecipientFromList from '../../../utils/getRecipientFromList'
import getSenderFromList from '../../../utils/getSenderFromList'
import multipleIncludes from '../../../utils/multipleIncludes'
import { EmailAvatarComponent } from '../../Elements/Avatar/EmailAvatar'
import * as S from './ContextBarStyles'

const ContextBar = () => {
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const [filteredUsers, setFilteredUsers] = useState<string[]>([])

  useEffect(() => {
    if (selectedEmails && selectedEmails.labelIds.length > 0) {
      let uniqueUsers = []
      if (
        !selectedEmails.labelIds.includes(global.DRAFT_LABEL) &&
        !selectedEmails.labelIds.includes(global.SENT_LABEL)
      ) {
        uniqueUsers = deduplicateItems(
          getSenderFromList({
            selectedEmails,
            emailList,
          })
        )
      } else {
        uniqueUsers = deduplicateItems(
          getRecipientFromList({
            selectedEmails,
            emailList,
          })
        )
      }
      setFilteredUsers(uniqueUsers)
    }
  }, [emailList, selectedEmails])

  return multipleIncludes(selectedEmails.labelIds, labelIds) ? (
    <S.Wrapper>
      <S.Inner>
        <GS.TextMutedSpanSmall> Selected emails by: </GS.TextMutedSpanSmall>
        {filteredUsers.map((user) => (
          <S.FromContainer key={user}>
            <EmailAvatarComponent userEmail={user} />
          </S.FromContainer>
        ))}
      </S.Inner>
    </S.Wrapper>
  ) : null
}

export default ContextBar
