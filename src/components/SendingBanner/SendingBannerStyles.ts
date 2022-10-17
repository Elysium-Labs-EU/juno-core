import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 10px;
  width: 100%;
  z-index: var(--z-index-modal);
`

export const Banner = styled.div`
  background-color: var(--color-black);
  border-radius: var(--radius-l);
  box-shadow: var(--box-shadow-low);
  color: var(--color-white);
  display: flex;
  justify-content: center;
  max-width: 400px;
  width: 100vw;
`

export const Inner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 30px;
  padding: 5px 15px;
  width: 100%;
`

export const MessageIcon = styled.div`
  align-items: center;
  display: flex;
`
