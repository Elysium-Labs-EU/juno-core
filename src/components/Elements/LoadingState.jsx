import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`

const LoadingState = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  )
}

export default LoadingState
