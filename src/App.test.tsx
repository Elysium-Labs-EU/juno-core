import { screen } from '@testing-library/react'

import renderWithProviders from 'utils/forTesting/testUtils'

import AppHeaderHelp from './AppHeaderHelp'

describe('App tests if base is loaded', () => {
  test('To render Help button', () => {
    renderWithProviders(<AppHeaderHelp />)
    expect(screen.findByTestId('help-button')).toBeTruthy()
  })
  test('To render Header component', () => {
    renderWithProviders(<AppHeaderHelp />)
    expect(screen.findByTestId('header')).toBeTruthy()
  })
})
