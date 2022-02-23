/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import * as themeConstants from '../../constants/themeConstants'

export const DialogHeader = styled.h2`
  text-align: center;
  font-weight: 200;
`

export const DialogContent = styled.div`
  padding: 24px 36px;
  background-color: ${themeConstants.colorOffWhite};
`

export const InnerContent = styled.div`
  padding: 16px 0;
  max-width: 400px;
`

export const DialogSubHeader = styled.h3`
  font-weight: 200;
  margin-top: 36px;
`
