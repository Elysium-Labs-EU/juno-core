import React from 'react'
import * as global from '../../constants/globalConstants'

const Emptystate = () => {
  return (
    <div className="mt-5 d-flex justify-content-center">
      <p>{global.NOTHING_TO_SEE}</p>
    </div>
  )
}

export default Emptystate
