/* eslint-disable import/prefer-default-export */
import styled, { css, keyframes } from 'styled-components'
import * as theme from '../../constants/themeConstants'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const rotatingIcon = css`
  animation: ${ rotate } 1s ease infinite;
`

interface IRotatingButton {
  disableRefresh: boolean
}

export const RotatingButton = styled.button<IRotatingButton>`
  border: none;
  color: ${ theme.colorGrey };
  outline: none;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  padding: 0;

  &:hover {
    color: ${ theme.colorBlack };
    cursor: pointer;
  }
  ${ (props) => (props.disableRefresh ? rotatingIcon : null) };
`