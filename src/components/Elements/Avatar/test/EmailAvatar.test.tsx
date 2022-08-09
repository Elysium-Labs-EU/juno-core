import renderWithProviders from '../../../../utils/ForTesting/testUtils'
import EmailAvatar from '../EmailAvatar'

test('Avatar renders with text if content is provided', () => {
    const component = renderWithProviders(
        <EmailAvatar avatarURL="test@test.com" />
    )
    expect(component).toMatchSnapshot()
})

test('Avatar renders with fallback if no usuable content is provided', () => {
    const component = renderWithProviders(
        <EmailAvatar avatarURL="" />
    )
    expect(component).toMatchSnapshot()
})
