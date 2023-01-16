import { expect } from 'vitest'

import reducer, {
  initialState,
  listRemoveItemDetail,
  listRemoveItemMessage,
} from '../emailListSlice'

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState)
})

test('listRemoveItemMessage returns the correct state', () => {
  const localInitialState = {
    emailList: [
      {
        labels: ['TEST'],
        threads: [
          {
            id: 'thread1',
            historyId: 'test',
            messages: [
              {
                id: 'message1',
                threadId: 'thread1',
                labelIds: [],
                snippet: '',
                payload: {
                  mimeType: '',
                  headers: {
                    date: '',
                    from: '',
                    subject: '',
                    to: '',
                    cc: '',
                    bcc: '',
                  },
                  files: undefined,
                  body: {
                    emailFileHTML: [],
                    emailHTML: '',
                    removedTrackers: [],
                  },
                  parts: [],
                },
                sizeEstimate: 0,
                historyId: '',
                internalDate: '',
              },
              {
                id: 'message2',
                threadId: 'thread1',
                labelIds: [],
                snippet: '',
                payload: {
                  mimeType: '',
                  headers: {
                    date: '',
                    from: '',
                    subject: '',
                    to: '',
                    cc: '',
                    bcc: '',
                  },
                  files: undefined,
                  body: {
                    emailFileHTML: [],
                    emailHTML: '',
                    removedTrackers: [],
                  },
                  parts: [],
                },
                sizeEstimate: 0,
                historyId: '',
                internalDate: '',
              },
              {
                id: 'message3',
                threadId: 'thread1',
                labelIds: [],
                snippet: '',
                payload: {
                  mimeType: '',
                  headers: {
                    date: '',
                    from: '',
                    subject: '',
                    to: '',
                    cc: '',
                    bcc: '',
                  },
                  files: undefined,
                  body: {
                    emailFileHTML: [],
                    emailHTML: '',
                    removedTrackers: [],
                  },
                  parts: [],
                },
                sizeEstimate: 0,
                historyId: '',
                internalDate: '',
              },
            ],
          },
        ],
        nextPageToken: null,
      },
    ],
    activeEmailListIndex: 0,
  }
  const newInitialState = { ...initialState, ...localInitialState }
  const check = reducer(
    newInitialState,
    listRemoveItemMessage({ threadId: 'thread1', messageId: 'message2' })
  )
  expect(check).toEqual({
    ...initialState,
    emailList: [
      {
        labels: ['TEST'],
        threads: [
          {
            id: 'thread1',
            historyId: 'test',
            messages: [
              {
                id: 'message1',
                threadId: 'thread1',
                labelIds: [],
                snippet: '',
                payload: {
                  mimeType: '',
                  headers: {
                    date: '',
                    from: '',
                    subject: '',
                    to: '',
                    cc: '',
                    bcc: '',
                  },
                  files: undefined,
                  body: {
                    emailFileHTML: [],
                    emailHTML: '',
                    removedTrackers: [],
                  },
                  parts: [],
                },
                sizeEstimate: 0,
                historyId: '',
                internalDate: '',
              },
              {
                id: 'message3',
                threadId: 'thread1',
                labelIds: [],
                snippet: '',
                payload: {
                  mimeType: '',
                  headers: {
                    date: '',
                    from: '',
                    subject: '',
                    to: '',
                    cc: '',
                    bcc: '',
                  },
                  files: undefined,
                  body: {
                    emailFileHTML: [],
                    emailHTML: '',
                    removedTrackers: [],
                  },
                  parts: [],
                },
                sizeEstimate: 0,
                historyId: '',
                internalDate: '',
              },
            ],
          },
        ],
        nextPageToken: null,
      },
    ],
    activeEmailListIndex: 0,
  })
})

test('listRemoveItemDetail returns the correct state', () => {
  const localInitialState = {
    emailList: [
      {
        labels: ['TEST'],
        threads: [
          {
            id: 'thread1',
            historyId: 'test',
            messages: [
              {
                id: 'message1',
                threadId: 'thread1',
                labelIds: [],
                snippet: '',
                payload: {
                  mimeType: '',
                  headers: {
                    date: '',
                    from: '',
                    subject: '',
                    to: '',
                    cc: '',
                    bcc: '',
                  },
                  files: undefined,
                  body: {
                    emailFileHTML: [],
                    emailHTML: '',
                    removedTrackers: [],
                  },
                  parts: [],
                },
                sizeEstimate: 0,
                historyId: '',
                internalDate: '',
              },
              {
                id: 'message2',
                threadId: 'thread1',
                labelIds: [],
                snippet: '',
                payload: {
                  mimeType: '',
                  headers: {
                    date: '',
                    from: '',
                    subject: '',
                    to: '',
                    cc: '',
                    bcc: '',
                  },
                  files: undefined,
                  body: {
                    emailFileHTML: [],
                    emailHTML: '',
                    removedTrackers: [],
                  },
                  parts: [],
                },
                sizeEstimate: 0,
                historyId: '',
                internalDate: '',
              },
              {
                id: 'message3',
                threadId: 'thread1',
                labelIds: [],
                snippet: '',
                payload: {
                  mimeType: '',
                  headers: {
                    date: '',
                    from: '',
                    subject: '',
                    to: '',
                    cc: '',
                    bcc: '',
                  },
                  files: undefined,
                  body: {
                    emailFileHTML: [],
                    emailHTML: '',
                    removedTrackers: [],
                  },
                  parts: [],
                },
                sizeEstimate: 0,
                historyId: '',
                internalDate: '',
              },
            ],
          },
        ],
        nextPageToken: null,
      },
    ],
    activeEmailListIndex: 0,
  }
  const newInitialState = { ...initialState, ...localInitialState }
  const check = reducer(
    newInitialState,
    listRemoveItemDetail({ threadId: 'thread1' })
  )
  expect(check).toEqual({
    ...initialState,
    emailList: [
      {
        labels: ['TEST'],
        threads: [],
        nextPageToken: null,
      },
    ],
    activeEmailListIndex: 0,
  })
})
