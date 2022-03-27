/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import * as themeConstants from '../../../constants/themeConstants'

export const Wrapper = styled.div`
  background: ${themeConstants.colorSlightWhite};
  border: 2px solid transparent;
  padding: 8px 16px;
  border-radius: 4px;
  color: ${themeConstants.colorGrey};
  &:hover,
  &:focus {
    border-color: ${themeConstants.colorPurpleSoft};
    color: ${themeConstants.colorBlack};
    cursor: pointer;
  }
  display: flex;
  justify-content: center;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const Inner = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  p {
    margin-left: 8px;
  }
`
