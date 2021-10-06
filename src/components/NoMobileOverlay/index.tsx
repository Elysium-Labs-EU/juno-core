import React from 'react'
import { Inner, Wrapper } from './noMobileOverlayStyles'
import * as local from '../../constants/noMobileOverlayConstants'

const NoMobileOverlay = () => (
  <Wrapper>
    <Inner>
      <h1>{local.HEADER}</h1>
      <p className="text_muxed">{local.CONTENT}</p>
    </Inner>
  </Wrapper>
)

export default NoMobileOverlay
