import React from 'react'
import './../../App.scss'
import styled from 'styled-components'
import {
  FiArchive,
  FiCornerUpLeft,
  FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi'
import ArchiveMail from './../EmailOptions/ArchiveMail'
import EmailMoreOptions from './../EmailMoreOptions'

const EmailOptionsContainer = styled.div`
  position: relative;
  padding: 30px;
`
const StickyOptions = styled.div`
  position: sticky;
  top: 122px;
`

const InnerOptionsContainer = styled.div`
  width: 110px;
`

const EmailDetOptions = (messageId) => {
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    // <img className="avatar avatar-xs rounded-circle" src={item.image} alt={item.nameSurname} />
    <EmailOptionsContainer>
      <StickyOptions>
        <InnerOptionsContainer>
          <div>
            <button type="button" className="btn option-link d-flex">
              <div className="icon">
                <FiCornerUpLeft />
              </div>
              <div className="labelContainer">Reply</div>
            </button>
          </div>
          <div>
            <button type="button" className="btn option-link d-flex">
              <div className="icon">
                <FiClock />
              </div>
              <div className="labelContainer">Remind</div>
            </button>
          </div>
          <div>
            <button type="button" className="btn option-link d-flex">
              <div className="icon">
                <FiArchive />
              </div>
              <div
                onClick={() => ArchiveMail(messageId)}
                className="labelContainer"
              >
                Archive
              </div>
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              type="button"
              className="btn option-link d-flex"
            >
              <div className="icon">
                <FiMoreHorizontal />
              </div>
              <div className="labelContainer">More</div>
            </button>
          </div>
          {showMenu && <EmailMoreOptions messageId={messageId} />}
        </InnerOptionsContainer>
      </StickyOptions>
    </EmailOptionsContainer>
  )
}

export default EmailDetOptions
