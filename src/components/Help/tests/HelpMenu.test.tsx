import { screen } from '@testing-library/react'
import renderWithProviders from '../../../utils/ForTesting/testUtils'
import HelpMenu from '../HelpMenu'

describe('Help menu tests', () => {
  test('To render modal', () => {
    renderWithProviders(<HelpMenu />)
    expect(screen.findByTestId('help-menu')).toBeTruthy()
  })
  test('To render help item title', () => {
    renderWithProviders(<HelpMenu />)
    expect(screen.findByTestId('item-title')).toBeTruthy()
  })
  test('To render help item hint, when provided', () => {
    renderWithProviders(<HelpMenu />)
    expect(screen.findByTestId('item-hint')).toBeTruthy()
  })
})
