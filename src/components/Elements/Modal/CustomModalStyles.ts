import styled from 'styled-components'

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1100;
  transform: translate(-50%, -50%);
  width: 825px;
  border-radius: 5px;
  background-color: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  outline: 0;
`

export const Inner = styled.div`
  padding: 20px;
  display: flex;
  flex-flow: column;
`

export const ModalHeader = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-grey-ultra-light);
`

export const HeaderRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`

export const ModalTitle = styled.h2`
  font-weight: 200;
  margin-bottom: 0;
`
