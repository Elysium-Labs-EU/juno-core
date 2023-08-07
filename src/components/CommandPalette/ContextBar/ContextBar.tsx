import { useEffect, useState } from 'react'

import { EmailAvatarComponent } from 'components/Elements/Avatar/EmailAvatar'
import * as global from 'constants/globalConstants'
import { selectEmailList, selectSelectedEmails } from 'store/emailListSlice'
import { useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import { Span } from 'styles/globalStyles'
import deduplicateItems from 'utils/deduplicateItems'
import getRecipientFromList from 'utils/getRecipientFromList'
import getSenderFromList from 'utils/getSenderFromList'
import multipleIncludes from 'utils/multipleIncludes'

import * as S from './ContextBarStyles'

const ContextBar = () => {
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const [filteredUsers, setFilteredUsers] = useState<string[]>([])

  useEffect(() => {
    if (selectedEmails && selectedEmails.labelIds.length > 0) {
      if (
        !selectedEmails.labelIds.includes(global.DRAFT_LABEL) &&
        !selectedEmails.labelIds.includes(global.SENT_LABEL)
      ) {
        const uniqueUsers = deduplicateItems(
          getSenderFromList({
            selectedEmails,
            emailList,
          }).filter(Boolean) as string[]
        )
        setFilteredUsers(uniqueUsers)
      } else {
        const uniqueUsers = deduplicateItems(
          getRecipientFromList({
            selectedEmails,
            emailList,
          }).filter(Boolean) as string[]
        )
        setFilteredUsers(uniqueUsers)
      }
    }
  }, [emailList, selectedEmails])

  return selectedEmails && multipleIncludes(selectedEmails.labelIds, labelIds) ? (
    <S.Wrapper>
      <S.Inner>
        <Span muted small>
          {' '}
          Selected emails by:{' '}
        </Span>
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
