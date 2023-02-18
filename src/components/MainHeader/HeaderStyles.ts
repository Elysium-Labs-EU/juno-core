import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 0 var(--spacing-2);
  position: relative;
`

export const InnerMenu = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1;
  justify-content: space-between;
  margin-bottom: var(--spacing-2);
  margin: var(--spacing-4) auto var(--spacing-2);
  max-width: min(100vw - 340px, 860px);
  min-width: 665px;
`

export const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  padding: var(--spacing-2) 0;
  max-width: var(--container-max-width);
`

export const BackButtonWithNavgationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: var(--spacing-4);
`

export const FocusSortHeaderWrapper = styled.div`
  display: flex;
  place-content: center;
  width: 100%;
`

export const StrictFlowButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: var(--spacing-1) 0 var(--spacing-1);

  button:nth-child(1) {
    margin-right: var(--spacing-2);
  }
  button:nth-child(2) {
    margin-right: var(--spacing-0-5);
  }
`

export const PageTitle = styled.h1`
  color: var(--color-black) !important;
  font-family: var(--font-family) !important;
  font-size: var(--h3);
  font-weight: 200;
  line-height: 1.3;
  margin: 0;
  text-transform: capitalize;
  user-select: none;
`

export const SearchQuery = styled.div`
  display: flex;
  width: 100%;
  place-content: center;
`
