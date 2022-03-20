/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import * as themeConstants from '../../../constants/themeConstants'

export const Wrapper = styled.div`
  background: ${themeConstants.colorSlightWhite};
  border: 2px solid transparent;
  padding: 24px;
  border-radius: 4px;
  &:hover,
  &:focus {
    border-color: ${themeConstants.colorPurpleSoft};
  }
`
