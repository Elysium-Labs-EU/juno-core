import type { PreloadedState } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type {
  // createMemoryHistory,
  History,
} from 'history'
import type { PropsWithChildren, ReactElement } from 'react'
import { Provider } from 'react-redux'

// import { HistoryRouter } from 'redux-first-history/rr6'
import type { AppStore, RootState } from 'store/store'
import { setupStore } from 'store/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
  history?: History
}

export default function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    // Create memory history to be used for tests
    // history = createMemoryHistory(),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({
    children = undefined,
  }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        {children}
        {/* <HistoryRouter history={history}>{children}</HistoryRouter> */}
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
