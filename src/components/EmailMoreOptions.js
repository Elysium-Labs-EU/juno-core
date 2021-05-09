import React from 'react'
import styled from 'styled-components'
import ThrashMail from './EmailOptions/ThrashMail'

const Wrapper = styled.div`
  z-index: 10;
  position: relative;
  padding: 0.5rem;
  box-shadow: 0 0 10px 0 hsla(0, 0%, 0%, 0.01);
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
`

const EmailMoreOptions = ({ messageId }) => {
  return (
    <Wrapper>
      <button
        className="btn option-link text-danger"
        onClick={() => ThrashMail(messageId)}
      >
        Delete
      </button>
    </Wrapper>
  )
}

export default EmailMoreOptions
