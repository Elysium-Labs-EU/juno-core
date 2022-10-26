/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

interface IEmailAvatarContainer {
  randomColor: string
}

export const EmailAvatarContainer = styled.div<IEmailAvatarContainer>`
  align-items: center;
  background-color: ${({ randomColor }) =>
    randomColor || 'rgba(165, 165, 165, 0.68)'};
  border-radius: 50%;
  color: ${({ randomColor }) =>
    randomColor.replace('0.2', '0.8') || 'rgba(165, 165, 165, 0.68)'};
  display: flex;
  font-weight: 600;
  height: 2rem;
  justify-content: center;
  position: relative;
  width: 2rem;
`
