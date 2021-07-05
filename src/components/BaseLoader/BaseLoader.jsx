import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Inner, Wrapper } from './BaseLoaderStyles'
import { LOADING_TEXT } from '../../constants/globalConstants'
import { selectServiceUnavailable } from '../../Store/utilsSlice'

const Baseloader = () => {
  const serviceUnavailable = useSelector(selectServiceUnavailable)
  return (
    <Wrapper>
      <Inner>
        {!serviceUnavailable && (
          <>
            <h1 style={{ marginBottom: '1rem' }}>{LOADING_TEXT}</h1>
            <CircularProgress />
          </>
        )}
        {serviceUnavailable && <p>{serviceUnavailable}</p>}
      </Inner>
    </Wrapper>
  )
}

export default Baseloader
