import React from 'react'
import { Inner, Wrapper } from './BaseLoaderStyles'
import { CircularProgress } from '@material-ui/core'

const LOADING_TEXT = 'Loading'

const Baseloader = () => {
  return (
    <Wrapper>
      <Inner>
        <h1 style={{ marginBottom: '1rem' }}>{LOADING_TEXT}</h1>
        <CircularProgress />
      </Inner>
    </Wrapper>
  )
}

export default Baseloader
