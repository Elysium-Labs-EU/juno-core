import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { Inner, Wrapper } from './BaseLoaderStyles'
import { LOADING_TEXT } from '../../constants/globalConstants'

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
