import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { store } from '../../store/store'
import { GlobalStyle, theme } from '../../styles/globalStyles'

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  </Provider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
