import React from 'react'
import styled from 'styled-components'
import * as global from '../../constants/globalConstants'

const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`

const Emptystate = () => {
  return (
    <Wrapper>
      <p>{global.NOTHING_TO_SEE}</p>
    </Wrapper>
  )
}

export default Emptystate
