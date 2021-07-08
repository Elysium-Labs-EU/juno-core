import React, { useState } from 'react'
import {
  FiArchive,
  FiCornerUpLeft,
  FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import ArchiveMail from '../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../EmailMoreOptions'
import * as S from './InlineThreadActionsStyles'
import { CustomIconLink } from '../Elements/Buttons'
import ReplyOverview from '../EmailOptions/ReplyOverview'

const InlineThreadActions = ({ id, history, labelIds }) => {
  const [showMenu, setShowMenu] = useState(false)
  const isReplying = true
  const dispatch = useDispatch()

  return (
    <S.Wrapper>
      <S.Inner>
        {/* <button
          type="button"
          className="button button-small text-muted option-link"
        >
          <div className="icon">
            <FiCornerUpLeft />
          </div>
        </button> */}
        <CustomIconLink
          className="button button-small text-muted option-link"
          icon={<FiCornerUpLeft />}
          onClick={() =>
            ReplyOverview({ history, labelIds, id, isReplying, dispatch })
          }
        />
        <CustomIconLink
          className="button button-small text-muted option-link"
          icon={<FiClock />}
        />
        <CustomIconLink
          onClick={() => ArchiveMail(id)}
          className="button button-small text-muted option-link"
          icon={<FiArchive />}
        />
        <CustomIconLink
          onClick={() => setShowMenu(!showMenu)}
          className="button button-small text-muted option-link"
          icon={<FiMoreHorizontal />}
        />
      </S.Inner>
      {showMenu && <EmailMoreOptions messageId={id} />}
    </S.Wrapper>
  )
}

export default InlineThreadActions
