import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 0 20px;
  position: relative;
`

export const InnerMenu = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  min-width: 665px;
  max-width: min(100vw - 340px, 860px);
  justify-content: space-between;
  flex: 1 1;
  margin: 40px auto 20px;
`

export const NavContainer = styled.div`
  padding: 0 20px;
  position: relative;
`

export const HeaderCenter = styled.div`
  display: flex;
  width: 100%;
  place-content: center;
`

export const BackButtonWithNavgationContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-bottom: 40px;
`

export const FocusSortHeaderWrapper = styled.div`
  display: flex;
  place-content: center;
  width: 100%;
`

export const StrictFlowButtonContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  margin: 40px 0 20px;

  button:last-child {
    margin-left: 20px;
  }
`

export const PageTitle = styled.h2`
  margin: 40px 0 0;
  font-weight: 200;
  user-select: none;
  text-transform: capitalize;
  font-size: 2.441rem;
  font-family: var(--font-family) !important;
  line-height: 1.3;
  color: var(--color-black) !important;
`
