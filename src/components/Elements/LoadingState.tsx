import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectServiceUnavailable } from '../../Store/utilsSlice'

const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`

const LoadingState = () => {
  const setServiceUnavailable = useSelector(selectServiceUnavailable)
  return (
    <Wrapper>
      <CircularProgress />
      {setServiceUnavailable && <p>{setServiceUnavailable}</p>}
    </Wrapper>
  )
}

export default LoadingState
