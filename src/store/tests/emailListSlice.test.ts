import { expect } from 'vitest'

import type {
  IEmailListState,
  ISelectedEmailAction,
} from 'store/storeTypes/emailListTypes'

import reducer, {
  initialState,
  listRemoveItemDetail,
  listRemoveItemDetailBatch,
  listRemoveItemMessage,
  handleAdditionToExistingEmailArray,
  handleEmailListChange,
  setSelectedEmails,
} from '../emailListSlice'
import { localInitialState } from './data/constants'

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

describe('handleAdditionToExistingEmailArray', () => {
  const state: IEmailListState = {
    activeEmailListIndex: -1,
    emailList: [],
    searchList: {
      labels: ['INBOX'],
      threads: [],
      timestamp: 0,
      nextPageToken: null,
      q: '',
    },
    isFetching: false,
    selectedEmails: { labelIds: [], selectedIds: [] },
  }

  it('adds new threads to the email list', () => {
    const newThreads = [
      { id: '123', subject: 'Test Thread 1', historyId: '1', messages: [] },
      { id: '456', subject: 'Test Thread 2', historyId: '2', messages: [] },
    ]

    handleAdditionToExistingEmailArray({
      targetEmailListObject: state.searchList!,
      state,
      labels: ['INBOX'],
      threads: newThreads,
      timestamp: Date.now(),
    })

    expect(state.searchList!.threads).toEqual(newThreads)
  })

  it('updates existing threads in the email list', () => {
    const existingThreads = [
      { id: '123', subject: 'Test Thread 1', historyId: '1', messages: [] },
      { id: '456', subject: 'Test Thread 2', historyId: '2', messages: [] },
    ]

    const updatedThreads = [
      {
        id: '123',
        subject: 'Updated Test Thread 1',
        historyId: '1',
        messages: [],
      },
      { id: '456', subject: 'Test Thread 2', historyId: '2', messages: [] },
    ]

    state.searchList!.threads = existingThreads

    handleAdditionToExistingEmailArray({
      targetEmailListObject: state.searchList!,
      state,
      labels: ['INBOX'],
      threads: updatedThreads,
      timestamp: Date.now(),
    })

    expect(state.searchList!.threads).toEqual(updatedThreads)
  })
})

describe('handleEmailListChange', () => {
  const state: IEmailListState = {
    activeEmailListIndex: -1,
    emailList: [],
    searchList: null,
    isFetching: false,
    selectedEmails: { labelIds: [], selectedIds: [] },
  }
  const labels = ['inbox']
  const threads = [
    { id: '1', subject: 'test', historyId: '1', messages: [] },
    { id: '2', subject: 'example', historyId: '2', messages: [] },
  ]
  const timestamp = Date.now()
  const nextPageToken = '123'
  const q = 'test'

  it('updates the search list when q is present', () => {
    handleEmailListChange({
      state,
      labels,
      threads,
      timestamp,
      nextPageToken,
      q,
    })
    expect(state.searchList).toBeDefined()
    expect(state.searchList?.q).toEqual(q)
    expect(state.searchList?.threads).toEqual(threads)
  })

  it('updates the email list when q is not present and arrayIndex exists', () => {
    handleEmailListChange({ state, labels, threads, timestamp, nextPageToken })
    expect(state.emailList.length).toEqual(1)
    expect(state.emailList[0]?.labels).toEqual(labels)
    expect(state.emailList[0]?.threads).toEqual(threads)
  })

  it('pushes a new email list when q is not present and arrayIndex does not exist', () => {
    handleEmailListChange({
      state,
      labels: ['test'],
      threads,
      timestamp,
      nextPageToken,
    })
    expect(state.emailList.length).toEqual(2)
    expect(state.emailList[1]?.labels).toEqual(['test'])
    expect(state.emailList[1]?.threads).toEqual(threads)
  })

  it('pushes an empty result object when threads is empty or undefined', () => {
    handleEmailListChange({
      state,
      labels: ['empty'],
      threads: [],
      timestamp: Date.now(),
    })
    expect(state.emailList.length).toEqual(3)
    expect(state.emailList[2]?.labels).toEqual(['empty'])
    expect(state.emailList[2]?.threads).toEqual([])
  })
})

describe('setSelectedEmails', () => {
  it('adds email id to selectedIds when event is "add"', () => {
    const emailId = '123'
    const payload = [
      {
        event: 'add' as ISelectedEmailAction['event'],
        id: emailId,
        labelIds: ['INBOX'],
      },
    ]
    const state: IEmailListState = {
      activeEmailListIndex: -1,
      emailList: [],
      isFetching: false,
      searchList: null,
      selectedEmails: { labelIds: [], selectedIds: [] },
    }
    const check = reducer(state, setSelectedEmails(payload))
    expect(check.selectedEmails.selectedIds).toContain(emailId)
    // expect(state.selectedEmails.selectedIds).toContain(emailId)
  })
  it('removes email id from selectedIds when event is "remove"', () => {
    const emailId = '456'
    const labelIds = ['INBOX']
    const payload = [
      {
        event: 'remove' as ISelectedEmailAction['event'],
        id: emailId,
        labelIds,
      },
    ]
    const state = {
      activeEmailListIndex: -1,
      emailList: [],
      isFetching: false,
      searchList: null,
      selectedEmails: { selectedIds: [emailId], labelIds },
    }
    const check = reducer(state, setSelectedEmails(payload))
    expect(check.selectedEmails.selectedIds).not.toContain(emailId)
  })
  it('sets labelIds and selectedIds when payload is not empty', () => {
    const labelIds = ['label1', 'label2']
    const payload = [
      { event: 'add' as ISelectedEmailAction['event'], id: '789', labelIds },
    ]
    const state = {
      activeEmailListIndex: -1,
      emailList: [],
      isFetching: false,
      searchList: null,
      selectedEmails: { selectedIds: [], labelIds: [] },
    }
    const check = reducer(state, setSelectedEmails(payload))
    // setSelectedEmails(state, { payload })
    expect(check.selectedEmails.labelIds).toEqual(labelIds)
    expect(check.selectedEmails.selectedIds).toContain('789')
  })
  // it('sets selectedEmails to initial state when payload is empty', () => {
  //   const emailId = '456'
  //   const labelIds = ['INBOX']
  //   const state = {
  //     activeEmailListIndex: -1,
  //     emailList: [],
  //     isFetching: false,
  //     searchList: null,
  //     selectedEmails: { selectedIds: [emailId], labelIds },
  //   }
  //   const payload = { selectedIds: [], labelIds }
  //   const check = reducer(state, setSelectedEmails(payload))
  //   // setSelectedEmails(state, { payload: [] })
  //   expect(initialState.selectedEmails).toEqual({ selectedIds: [] })
  // })
})
