import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
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
            <h2 className="page_title" style={{ marginBottom: '1rem' }}>{LOADING_TEXT}</h2>
            <CircularProgress />
          </>
        )}
        {serviceUnavailable && <p>{serviceUnavailable}</p>}
      </Inner>
    </Wrapper>
  )
}

export default Baseloader
