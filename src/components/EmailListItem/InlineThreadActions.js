import React from 'react'
import styled from 'styled-components'
import { FiArchive, FiCornerUpLeft, FiClock, FiMoreHorizontal } from 'react-icons/fi'

const Wrapper = styled.div`
  opacity: 0;
  position: absolute;
  top: 18px;
  right: 30px;
  bottom: 0;

  :hover {
    opacity: 1;
    background-color: rgb(240, 240, 240);
  }
`
const InlineThreadActions = () => {
  return (
    <Wrapper>
      <div className="d-flex flex-row">
        <button type="button" className="btn btn-sm option-link">
          <div className="icon">
            <FiCornerUpLeft />
          </div>
        </button>
        <button type="button" className="btn btn-sm option-link">
          <div className="icon">
            <FiClock />
          </div>
        </button>
        <button type="button" className="btn btn-sm option-link">
          <div className="icon">
            <FiArchive />
          </div>
        </button>
        <button type="button" className="btn btn-sm option-link">
          <div className="icon">
            <FiMoreHorizontal />
          </div>
        </button>
      </div>
    </Wrapper>
  )
}

export default InlineThreadActions
