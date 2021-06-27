import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'

const LoadingState = () => {
  return (
    <div className="mt-5 d-flex justify-content-center">
      <CircularProgress />
    </div>
  )
}

export default LoadingState
