import React, { useState } from 'react'
import { FiArchive, FiCornerUpLeft, FiMoreHorizontal } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ArchiveMail from '../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../EmailMoreOptions'
import * as S from './InlineThreadActionsStyles'
import { CustomIconLink } from '../Elements/Buttons'
import ReplyOverview from '../EmailOptions/ReplyOverview'

const InlineThreadActions = ({ id, history, labelIds }) => {
  const [showMenu, setShowMenu] = useState(false)
  const isReplying = true
  const dispatch = useDispatch()
  const location = useLocation()
  const messageId = id && id

  return (
    <S.Wrapper>
      <S.Inner>
        <CustomIconLink
          className="button button-small text_muted option-link"
          icon={<FiCornerUpLeft />}
          onClick={() =>
            ReplyOverview({ history, labelIds, id, isReplying, dispatch })
          }
        />
        {/* <CustomIconLink
          className="button button-small text_muted option-link"
          icon={<FiClock />}
        /> */}
        <CustomIconLink
          onClick={() =>
            ArchiveMail({ messageId, location, dispatch, labelIds })
          }
          className="button button-small text_muted option-link"
          icon={<FiArchive />}
        />
        <CustomIconLink
          onClick={() => setShowMenu(!showMenu)}
          className="button button-small text_muted option-link"
          icon={<FiMoreHorizontal />}
        />
      </S.Inner>
      {showMenu && <EmailMoreOptions messageId={id} labelIds={labelIds} />}
    </S.Wrapper>
  )
}

export default InlineThreadActions
