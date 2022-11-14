import renderWithProviders from 'utils/forTesting/testUtils'

import EmailAvatar from '../EmailAvatar'

test('Avatar renders with text if content is provided', () => {
  const component = renderWithProviders(
    <EmailAvatar userEmail="test@test.com" />
  )
  expect(component).toMatchSnapshot()
})

test('Avatar renders with fallback if no usuable content is provided', () => {
  const component = renderWithProviders(<EmailAvatar userEmail="" />)
  expect(component).toMatchSnapshot()
})
