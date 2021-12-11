/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

interface IEmailAvatarContainer {
  randomColor: string
}

export const EmailAvatarContainer = styled.div<IEmailAvatarContainer>`
  background-color: ${(props) =>
    props.randomColor ? props.randomColor : 'rgba(165, 165, 165, 0.68)'};
  width: 2rem;
  display: flex;
  justify-content: center;
  color: #f5f5f5;
  font-weight: 600;
  border-radius: 50%;
  height: 2rem;
  align-items: center;
`
