import styled from 'styled-components'
import { breakPoint } from '../../../constants/themeConstants'

export const Modal = styled.div`
  background-color: var(--color-white);
  border-radius: 5px;
  box-shadow: var(--box-shadow-low);
  left: 50%;
  outline: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 825px;
  z-index: var(--z-index-modal);
  @media only screen and (max-width: ${breakPoint.md}) {
    min-height: 50%;
    width: 100%;
  }
`

export const Inner = styled.div`
  display: flex;
  flex-flow: column;
  margin: 20px;
`

export const ModalHeader = styled.div`
  border-bottom: 1px solid var(--color-neutral-200);
`

export const HeaderRow = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`

export const ModalTitle = styled.h2`
  font-weight: 200;
  margin-bottom: 0;
  margin-top: 0;
`
