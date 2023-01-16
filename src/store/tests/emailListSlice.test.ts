import { expect } from 'vitest'

import reducer, {
  initialState,
  listRemoveItemDetail,
  listRemoveItemDetailBatch,
  listRemoveItemMessage,
} from '../emailListSlice'

const localInitialState = {
  emailList: [
    {
      labels: ['TEST'],
      threads: [
        {
          id: '1',
          historyId: 'test',
          messages: [
            {
              id: '1',
              threadId: '1',
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
              id: '2',
              threadId: '1',
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
              id: '3',
              threadId: '1',
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
        {
          id: '4',
          historyId: 'test',
          messages: [
            {
              id: '4',
              threadId: '4',
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
              id: '5',
              threadId: '4',
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
              id: '6',
              threadId: '4',
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

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState)
})

test('listRemoveItemMessage returns the correct state when removing 1 message', () => {
  const newInitialState = { ...initialState, ...localInitialState }
  const check = reducer(
    newInitialState,
    listRemoveItemMessage({ threadId: '1', messageId: '3' })
  )
  expect(check).toEqual({
    ...initialState,
    emailList: [
      {
        labels: ['TEST'],
        threads: [
          {
            id: '1',
            historyId: 'test',
            messages: [
              {
                id: '1',
                threadId: '1',
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
                id: '2',
                threadId: '1',
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
          {
            id: '4',
            historyId: 'test',
            messages: [
              {
                id: '4',
                threadId: '4',
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
                id: '5',
                threadId: '4',
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
                id: '6',
                threadId: '4',
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
  const newInitialState = { ...initialState, ...localInitialState }
  const check = reducer(
    newInitialState,
    listRemoveItemDetail({ threadId: '1' })
  )
  expect(check).toEqual({
    ...initialState,
    emailList: [
      {
        labels: ['TEST'],
        threads: [
          {
            id: '4',
            historyId: 'test',
            messages: [
              {
                id: '4',
                threadId: '4',
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
                id: '5',
                threadId: '4',
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
                id: '6',
                threadId: '4',
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

test('removes all the threads that are sent as the payload', () => {
  const messageIds = ['thread1', 'thread2-1']
  const newInitialState = { ...initialState, ...localInitialState }
  const check = reducer(
    newInitialState,
    listRemoveItemDetailBatch({ messageIds })
  )

  assert.equal(check.emailList[0]?.threads.length, 2)
  assert.notEqual(
    check?.emailList[0]?.threads.filter((thread) =>
      messageIds.includes(thread.id)
    ),
    undefined
  )
})
