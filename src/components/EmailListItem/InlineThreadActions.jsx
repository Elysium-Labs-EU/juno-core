import React, { useState } from 'react'
import {
  FiArchive,
  FiCornerUpLeft,
  FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi'
import ArchiveMail from '../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../EmailMoreOptions'
import * as S from './InlineThreadActionsStyles'

const InlineThreadActions = (messageId) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <S.Wrapper>
      <div className="d-flex flex-row">
        <button
          type="button"
          className="button button-small text-muted option-link"
        >
          <div className="icon">
            <FiCornerUpLeft />
          </div>
        </button>
        <button
          type="button"
          className="button button-small text-muted option-link"
        >
          <div className="icon">
            <FiClock />
          </div>
        </button>
        <button
          onClick={() => ArchiveMail(messageId)}
          type="button"
          className="button button-small text-muted option-link"
        >
          <div className="icon">
            <FiArchive />
          </div>
        </button>
        <button
          onClick={() => setShowMenu(!showMenu)}
          type="button"
          className="button button-small text-muted option-link"
        >
          <div className="icon">
            <FiMoreHorizontal />
          </div>
        </button>
      </div>
      {showMenu && <EmailMoreOptions messageId={messageId} />}
    </S.Wrapper>
  )
}

export default InlineThreadActions
