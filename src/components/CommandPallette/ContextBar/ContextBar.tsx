import { useEffect, useState } from 'react'

import {
  selectEmailList,
  selectSelectedEmails,
} from '../../../store/emailListSlice'
import { useAppSelector } from '../../../store/hooks'
import { EmailAvatarComponent } from '../../Elements/Avatar/EmailAvatar'
import * as S from './ContextBarStyles'
import * as GS from '../../../styles/globalStyles'
import getSenderFromList from '../../../utils/getSenderFromList'
import deduplicateItems from '../../../utils/deduplicateItems'

const ContextBar = () => {
  const emailList = useAppSelector(selectEmailList)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const [filteredFrom, setFilteredFrom] = useState<string[]>([])

  useEffect(() => {
    if (selectedEmails && selectedEmails.labelIds.length > 0) {
      setFilteredFrom(
        deduplicateItems(getSenderFromList({ selectedEmails, emailList }))
      )
    }
  }, [emailList, selectedEmails])

  return (
    <S.Wrapper>
      <S.Inner>
        <GS.TextMutedSpanSmall> Selected emails from: </GS.TextMutedSpanSmall>
        {filteredFrom.map((fromEmail) => (
          <S.FromContainer key={fromEmail}>
            <EmailAvatarComponent userEmail={fromEmail} />
          </S.FromContainer>
        ))}
      </S.Inner>
    </S.Wrapper>
  )
}

export default ContextBar
