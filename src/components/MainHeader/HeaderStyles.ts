import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  padding: 0 var(--spacing-2);
  position: relative;
`

export const InnerMenu = styled.div`
  display: flex;
  margin-bottom: var(--spacing-2);
  align-items: center;
  min-width: 665px;
  max-width: min(100vw - 3var (--spacing-4), 860px);
  justify-content: space-between;
  flex: 1 1;
  margin: var(--spacing-4) auto var(--spacing-2);
`

export const NavContainer = styled.div`
  padding: 0 var(--spacing-2);
  position: relative;
`

export const HeaderCenter = styled.div`
  display: flex;
  width: 100%;
  place-content: center;
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

interface IStrictFlowButtonContainer {
  isFlexibleFlowActive?: boolean
}

export const StrictFlowButtonContainer = styled.div<IStrictFlowButtonContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: var(--spacing-4) 0 var(--spacing-2);

  ${({ isFlexibleFlowActive }) =>
    !isFlexibleFlowActive &&
    css`
      button:nth-child(1) {
        margin-right: var(--spacing-2);
      }
    `}
  button:nth-child(2) {
    margin-right: var(--spacing-0-5);
  }
`

export const PageTitle = styled.h2`
  margin: var(--spacing-4) 0 0;
  font-weight: 200;
  user-select: none;
  text-transform: capitalize;
  font-size: 2.441rem;
  font-family: var(--font-family) !important;
  line-height: 1.3;
  color: var(--color-black) !important;
`

export const SearchQuery = styled.div`
  display: flex;
  width: 100%;
  place-content: center;
`
