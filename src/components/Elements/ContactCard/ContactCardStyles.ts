import { Card, CardMedia } from '@mui/material'
import styled from 'styled-components'

interface IContactCardColors {
  $randomColor: string
}

export const ContactCard = styled(Card)`
  animation: fadeInUp 0.2s both;
  background-color: var(--color-black);
  border-radius: var(--radius-m);
  box-shadow: var(--box-shadow-low) !important;
  position: relative;
  width: 14rem;

  /* Animation */
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 5px, 0);
    }

    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`

export const ContactCardAvatar = styled(CardMedia)<IContactCardColors>`
  background-color: ${({ $randomColor }) =>
    $randomColor || 'rgba(165, 165, 165, 0.68)'};
  display: flex !important;
  height: 8rem;
  justify-content: center;
  color: ${({ $randomColor }) =>
    $randomColor.replace('0.2', '0.8') || 'rgba(165, 165, 165, 0.68)'};
  font-weight: 600;
  font-size: 1.8rem;
  align-items: center;
  position: relative;
`

export const ContactCardName = styled.div`
  font-size: 1rem;
  margin-bottom: 0.8rem;
  font-weight: bold;
  line-height: 1.21;
  color: var(--color-black);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const ContactCardEmail = styled.span`
  font-size: var(--small);
  display: block;
  font-weight: bold;
  color: var(--color-black);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const ContactCardDetails = styled.div`
  align-items: center;
  display: flex;
`

export const ContactCardEmailButton = styled.button<IContactCardColors>`
  background-color: ${({ randomColor }) =>
    randomColor || 'rgba(165, 165, 165, 0.68)'} !important;
  color: ${({ randomColor }) =>
    randomColor.replace('0.2', '0.8') || 'rgba(165, 165, 165, 0.68)'};
  border-radius: var(--radius-m);
  padding: 0.4rem;
  display: flex;
  align-items: center;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    color: white !important;
    cursor: pointer;
  }

  &:disabled {
    color: var(--color-neutral-400);
    background-color: var(--color-neutral-200) !important;
    cursor: not-allowed;
  }
`
