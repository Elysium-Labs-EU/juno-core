import { screen } from '@testing-library/react'
import renderWithProviders from '../../../utils/ForTesting/testUtils'
import Search from '../Search'

describe('Search tests', () => {
  test('To render modal', () => {
    renderWithProviders(<Search />)
    expect(screen.findByLabelText('modal-search')).toBeTruthy()
  })
  test('To render search button', () => {
    renderWithProviders(<Search />)
    expect(screen.findByLabelText('Search')).toBeTruthy()
  })
  test('To render close button', () => {
    renderWithProviders(<Search />)
    expect(screen.findByLabelText('close-modal')).toBeTruthy()
  })
  test('Search button is disabled if there is no search value', () => {
    renderWithProviders(<Search />)
    expect(screen.findByLabelText('Search')).toHaveProperty('disabled', true)
  })
  // test('To render close button', () => {
  //     renderWithProviders(<Search />)
  //     expect(screen.findByLabelText('close-modal')).toBeTruthy()
  // })
  // test('To close search modal if close button is clicked', () => {
  //     renderWithProviders(<Search />)
  //     const node = screen.getByLabelText('close-modal')
  //     fireEvent.click(node)
  //     expect(screen.findByLabelText('close-modal')).toBeTruthy()
  // })
  // test('If the component has a search value entered, show clear search input button', () => {
  //     renderWithProviders(<Search />)
  // })
  // test('If load state is equal to loading', () => {

  // })
})
