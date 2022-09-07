import { screen } from '@testing-library/react'
import App from '../../../App'
import renderWithProviders from '../../../utils/ForTesting/testUtils'
// import Settings from '../Settings'
import * as global from '../../../constants/globalConstants'

const initiaUtilsState = {
  inSearch: false,
  isLoading: false,
  isProcessing: false,
  serviceUnavailable: null,
  isSilentLoading: false,
  isAvatarVisible: true,
  isFlexibleFlowActive: false,
  emailFetchSize: 20,
  settingsLabelId: null,
  activeModal: global.ACTIVE_MODAL_MAP.settings,
}
const initialBaseState = {
  baseLoaded: true,
  profile: {
    signature: '',
    name: '',
    picture: '',
    emailAddress: '',
    messagesTotal: 0,
    threadsTotal: 0,
    historyId: '',
  },
  isAuthenticated: true,
}

describe('Setting menu tests', () => {
  test('To render modal', () => {
    renderWithProviders(<App />, {
      preloadedState: {
        utils: initiaUtilsState,
        base: initialBaseState,
      },
    })
    expect(screen.getByRole('presentation')).toBeTruthy()
  })
})
