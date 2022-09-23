import { screen } from '@testing-library/react'
import type { IEmailListObject } from '../../../store/storeTypes/emailListTypes'
import renderWithProviders from '../../../utils/ForTesting/testUtils'
import EmailDetail from '../EmailDetail'
// import toJson from '../../../utils/toJSONforTest'

const FAKE_EMAIL_LIST_OBJECT: IEmailListObject = {
  labels: ['LABEL'],
  threads: [
    {
      id: '1821754d6ae59873',
      historyId: '123132',
      messages: [
        {
          id: '1821754d6ae59873',
          threadId: '1821754d6ae59873',
          labelIds: ['LABEL', 'UNREAD'],
          snippet: 'Testing snippet',
          payload: {
            partId: '1',
            mimeType: 'multipart/alternative',
            filename: '1',
            headers: ['Content-Type', 'asfsadf'],
            body: {
              data: '123',
              size: 123123,
            },
          },
          sizeEstimate: 25102,
          historyId: '123132',
          internalDate: '2131233',
        },
      ],
    },
  ],
  nextPageToken: '123123',
}

describe('EmailDetail tests', () => {
  test('If there is an activeEmailList, it should always render an email detail header', () => {
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
    const initialEmailListState = {
      emailList: [FAKE_EMAIL_LIST_OBJECT],
      selectedEmails: [],
      searchList: null,
      activeEmailListIndex: 0,
      isFetching: false,
    }
    const initialEmailDetailState = {
      coreStatus: null,
      currEmail: '1821754d6ae59873',
      currMessage: '',
      viewIndex: 0,
      sessionViewIndex: -1,
      isReplying: false,
      isForwarding: false,
    }
    const initialUtilsSlice = {
      inSearch: false,
      isLoading: false,
      serviceUnavailable: '',
      isSilentLoading: false,
      isSettingsOpen: false,
      isAvatarVisible: true,
      emailFetchSize: 20,
      showIntroduction: null,
      settingsLabelId: null,
      showKeyboardCombos: false,
    }

    renderWithProviders(<EmailDetail />, {
      preloadedState: {
        base: intialBaseState,
        email: initialEmailListState,
        emailDetail: initialEmailDetailState,
        utils: initialUtilsSlice,
      },
    })

    expect(screen.getByTestId('email-detail-header')).toBeDefined()
  })

  test('If there is no activeEmailList, it should display a base loader', () => {
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
    const initialEmailListState = {
      emailList: [],
      selectedEmails: [],
      searchList: null,
      activeEmailListIndex: -1,
      isFetching: false,
    }
    const initialEmailDetailState = {
      coreStatus: null,
      currEmail: '1821754d6ae59873',
      currMessage: '',
      viewIndex: 0,
      sessionViewIndex: -1,
      isReplying: false,
      isForwarding: false,
    }
    const initialUtilsSlice = {
      inSearch: false,
      isLoading: false,
      serviceUnavailable: '',
      isSilentLoading: false,
      isSettingsOpen: false,
      isAvatarVisible: true,
      emailFetchSize: 20,
      showIntroduction: null,
      settingsLabelId: null,
      showKeyboardCombos: false,
    }

    renderWithProviders(<EmailDetail />, {
      preloadedState: {
        base: intialBaseState,
        email: initialEmailListState,
        emailDetail: initialEmailDetailState,
        utils: initialUtilsSlice,
      },
    })

    expect(screen.findByTestId('base-loader')).toBeDefined()
  })
})
