import { screen } from '@testing-library/react'
import renderWithProviders from '../../utils/ForTesting/testUtils'
import Baseloader, { LOGO_ALT } from './BaseLoader'

describe('Baseloader tests', () => {
  test('If there is no service unavailable notice, show an image', () => {
    const intialBaseState = {
      baseLoaded: false,
      profile: {
        emailAddress: '',
        messagesTotal: 0,
        threadsTotal: 0,
        historyId: '',
      },
      isAuthenticated: false,
    }
    const initialUtilsSlice = {
      inSearch: false,
      isLoading: false,
      serviceUnavailable: null,
      isSilentLoading: false,
      isSettingsOpen: false,
      isAvatarVisible: true,
      emailFetchSize: 20,
      showIntroduction: null,
      settingsLabelId: null,
      showKeyboardCombos: false,
    }

    renderWithProviders(<Baseloader />, {
      preloadedState: {
        base: intialBaseState,
        utils: initialUtilsSlice,
      },
    })

    expect(screen.getByAltText(LOGO_ALT)).toBeDefined()
  })

  test('If there is a service unavailable notice, show the notice and no image', () => {
    const intialBaseState = {
      baseLoaded: false,
      profile: {
        emailAddress: '',
        messagesTotal: 0,
        threadsTotal: 0,
        historyId: '',
      },
      isAuthenticated: false,
    }
    const initialUtilsSlice = {
      inSearch: false,
      isLoading: false,
      serviceUnavailable: 'Test',
      isSilentLoading: false,
      isSettingsOpen: false,
      isAvatarVisible: true,
      emailFetchSize: 20,
      showIntroduction: null,
      settingsLabelId: null,
      showKeyboardCombos: false,
    }

    renderWithProviders(<Baseloader />, {
      preloadedState: {
        base: intialBaseState,
        utils: initialUtilsSlice,
      },
    })

    expect(screen.queryByAltText(LOGO_ALT)).toBe(null)
    expect(screen.getByText('Test')).toBeDefined()
  })
})
