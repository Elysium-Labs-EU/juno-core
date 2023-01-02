import React from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from '../src/styles/globalStyles'
import { store } from '../src/store/store'

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <GlobalStyle />
      <Story />
    </Provider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
