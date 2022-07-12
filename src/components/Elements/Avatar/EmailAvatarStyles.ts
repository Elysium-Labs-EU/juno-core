/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

interface IEmailAvatarContainer {
  randomColor: string
}

export const EmailAvatarContainer = styled.div<IEmailAvatarContainer>`
  background-color: ${({ randomColor }) =>
    randomColor || 'rgba(165, 165, 165, 0.68)'};
  width: 2rem;
  display: flex;
  justify-content: center;
  color: ${({ randomColor }) =>
    randomColor.replace('0.2', '0.8') || 'rgba(165, 165, 165, 0.68)'};
  /* color: #f5f5f5; */
  font-weight: 600;
  border-radius: 50%;
  height: 2rem;
  align-items: center;
  position: relative;
  span {
    position: absolute;
    top: 10px;
  }
`
