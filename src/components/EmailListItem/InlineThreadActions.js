import React from 'react'
import styled from 'styled-components'
import {
  FiArchive,
  FiCornerUpLeft,
  FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi'
import ArchiveMail from '../emailOptions/ArchiveMail'
import EmailMoreOptions from '../EmailMoreOptions'

const Wrapper = styled.div`
  opacity: 0;
  position: absolute;
  top: 18px;
  right: 30px;
  bottom: 0;
  z-index: 10;

  :hover {
    opacity: 1;
    background-color: rgb(240, 240, 240);
  }
`

const InlineThreadActions = (messageId) => {
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    <Wrapper>
      <div className="d-flex flex-row">
        <button type="button" className="btn btn-sm text-muted option-link">
          <div className="icon">
            <FiCornerUpLeft />
          </div>
        </button>
        <button type="button" className="btn btn-sm text-muted option-link">
          <div className="icon">
            <FiClock />
          </div>
        </button>
        <button
          onClick={() => ArchiveMail(messageId)}
          type="button"
          className="btn btn-sm text-muted option-link"
        >
          <div className="icon">
            <FiArchive />
          </div>
        </button>
        <button
          onClick={() => setShowMenu(!showMenu)}
          type="button"
          className="btn btn-sm text-muted option-link"
        >
          <div className="icon">
            <FiMoreHorizontal />
          </div>
        </button>
      </div>
      {showMenu && <EmailMoreOptions messageId={messageId} />}
    </Wrapper>
  )
}

export default InlineThreadActions
