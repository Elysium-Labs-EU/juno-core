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
  font-size: var(--text-h3);
  align-items: center;
  position: relative;
`

export const ContactCardName = styled.div`
  color: var(--color-black);
  font-size: var(--text-base);
  font-weight: bold;
  line-height: 1.21;
  margin-bottom: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ContactCardEmail = styled.span`
  color: var(--color-black);
  display: block;
  font-size: var(--text-small);
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: var(--spacing-0-75);
  overflow: hidden;
`

export const ContactCardEmailButton = styled.button<IContactCardColors>`
  align-items: center;
  background-color: ${({ $randomColor }) =>
    $randomColor || 'var(--color-purple-100)'} !important;
  color: ${({ $randomColor }) =>
    $randomColor.replace('0.2', '0.8') || 'var(--color-purple-100)'};
  background-color: transparent;
  border-radius: var(--radius-m);
  border: none;
  display: flex;
  height: 100%;
  outline: none;
  padding: var(--spacing-0-75);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    color: var(--color-white) !important;
    cursor: pointer;
  }

  &:disabled {
    background-color: var(--color-neutral-200) !important;
    color: var(--color-neutral-400);
    cursor: not-allowed;
  }
`
