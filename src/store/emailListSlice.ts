import { current, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'

import * as global from 'constants/globalConstants'
import historyApi from 'data/historyApi'
import messageApi from 'data/messageApi'
import threadApi from 'data/threadApi'
import type { IEmailQueryObject } from 'data/threadApi'
import userApi from 'data/userApi'
import { setProfile } from 'store/baseSlice'
import {
  fetchEmailDetail,
  setCoreStatus,
  setCurrentEmail,
  setViewIndex,
} from 'store/emailDetailSlice'
import { setCurrentLabels, setLoadedInbox } from 'store/labelsSlice'
import type { AppThunk, RootState } from 'store/store'
import type {
  IEmailListObject,
  IEmailListState,
  IEmailListThreadItem,
  ISelectedEmailAction,
  TBaseEmailList,
} from 'store/storeTypes/emailListTypes'
import type {
  IUpdateRequest,
  IUpdateRequestParamsBatch,
  IUpdateRequestParamsSingle,
} from 'store/storeTypes/metaEmailListTypes'
import {
  navigateNextMail,
  setIsLoading,
  setIsSilentLoading,
  setSystemStatusUpdate,
} from 'store/utilsSlice'
import deduplicateItems from 'utils/deduplicateItems'
import handleSessionStorage from 'utils/handleSessionStorage'
import { edgeLoadingNextPage } from 'utils/loadNextPage'
import multipleIncludes from 'utils/multipleIncludes'
import { onlyLegalLabelObjects } from 'utils/onlyLegalLabels'
import sortThreads from 'utils/sortThreads'

/* eslint-disable no-param-reassign */

export const fetchEmailsSimple = createAsyncThunk(
  'email/fetchEmailsSimple',
  async (query: IEmailQueryObject, { signal }) => {
    const response = await threadApi({ signal }).getSimpleThreads(query)
    return { response: response.data, labels: query.labelIds, q: query?.q }
  }
)

/**
 * @function fetchEmailsFull
 * @deprecated in favor of fetchEmailSimple
 */
export const fetchEmailsFull = createAsyncThunk(
  'email/fetchEmailsFull',
  async (query: IEmailQueryObject, { signal }) => {
    const response = await threadApi({ signal }).getFullThreads(query)
    return { response: response.data, labels: query.labelIds }
  }
)

export const initialState: IEmailListState = Object.freeze({
  activeEmailListIndex: -1,
  emailList: [],
  isFetching: false,
  searchList: null,
  selectedEmails: { labelIds: [], selectedIds: [] },
})

interface IHandleAdditionToExistingEmailArray {
  targetEmailListObject: IEmailListObject
  state: IEmailListState
  labels: Array<string>
  threads: Array<IEmailListThreadItem>
  timestamp: number | undefined
  arrayIndex?: number
  nextPageToken?: undefined | string | null
  q?: undefined | string
}

export const handleAdditionToExistingEmailArray = ({
  targetEmailListObject,
  state,
  labels,
  threads,
  timestamp,
  arrayIndex,
  nextPageToken,
  q,
}: IHandleAdditionToExistingEmailArray) => {
  const tempArray: Array<IEmailListThreadItem> = []
  let activeCount: number = 0
  const completeCount: number = threads.length
  const existingThreads = new Map(
    targetEmailListObject.threads.map((thread) => [thread.id, thread])
  )

  for (let i = 0; i < completeCount; i += 1) {
    const activeThreads = threads[i]
    if (activeThreads?.id) {
      if (!existingThreads.has(activeThreads.id)) {
        activeCount += 1
        tempArray.push(activeThreads)
      } else {
        activeCount += 1
        const existingThread = existingThreads.get(activeThreads.id)
        if (existingThread) {
          existingThreads.set(activeThreads.id, {
            ...existingThread,
            ...activeThreads,
          })
        }
      }
    }
  }

  if (activeCount === completeCount) {
    const sortedThreads = sortThreads(
      [...existingThreads.values()].concat(tempArray),
      labels.includes(global.DRAFT_LABEL)
    )

    // Here we create the final object that will be pushed to the Redux state
    // If the timestamp and/or nextPageToken are history values, maintain the original version.
    const newObject: IEmailListObject = {
      labels,
      threads: deduplicateItems(sortedThreads),
      nextPageToken:
        nextPageToken === global.HISTORY_NEXT_PAGETOKEN
          ? targetEmailListObject.nextPageToken
          : nextPageToken,
      timestamp:
        timestamp === global.HISTORY_TIME_STAMP
          ? targetEmailListObject.timestamp
          : timestamp,
      q,
    }
    targetEmailListObject = newObject
    if (arrayIndex && arrayIndex > -1) {
      state.emailList[arrayIndex] = targetEmailListObject
    } else {
      state.searchList = targetEmailListObject
    }
  }
}

interface IHandleEmailListChange {
  state: IEmailListState
  labels: Array<string> | undefined
  threads: Array<IEmailListThreadItem>
  timestamp: number | undefined
  nextPageToken?: undefined | string | null
  q?: string
}

export const handleEmailListChange = ({
  state,
  labels,
  threads,
  timestamp,
  nextPageToken,
  q,
}: IHandleEmailListChange) => {
  // The flow can only work if there are labels to use
  if (labels) {
    // Find emailList sub-array index
    const [firstLabel] = labels
    const arrayIndex = state.emailList.findIndex((emailArray) =>
      firstLabel ? emailArray.labels.includes(firstLabel) : -1
    )
    if (threads && threads.length) {
      // If the input contains a q - it is search request.
      if (q) {
        // This function is used to update the search List.
        // If there is one, use the function, otherwise just assign the state.
        const targetEmailListObject = state.searchList
        if (targetEmailListObject && q === targetEmailListObject?.q) {
          handleAdditionToExistingEmailArray({
            targetEmailListObject,
            state,
            labels,
            threads,
            timestamp,
            arrayIndex,
            nextPageToken,
            q,
          })
        } else {
          const sortedThreads = sortThreads(threads)
          const sortedEmailList: IEmailListObject = {
            nextPageToken,
            labels,
            threads: sortedThreads,
            q,
          }
          state.searchList = sortedEmailList
        }
        return
      }
      // If emailList sub-array index exists, if exists concat threads.
      // If not, push the new emailList
      if (arrayIndex > -1) {
        const targetEmailListObject = state.emailList[arrayIndex]
        // It loops through all the newly fetched threads, and if check what to do with this.
        // Either push it to the tempArray, or update the entry in the emailList state.
        if (targetEmailListObject) {
          handleAdditionToExistingEmailArray({
            targetEmailListObject,
            state,
            labels,
            threads,
            timestamp,
            arrayIndex,
            nextPageToken,
          })
          return
        }
      }
      if (arrayIndex === -1 && !labels.includes(global.SEARCH_LABEL)) {
        const sortedThreads = sortThreads(threads)

        const sortedEmailList: IEmailListObject = {
          nextPageToken,
          labels,
          threads: deduplicateItems(sortedThreads),
        }
        state.emailList.push(sortedEmailList)
      }
      return
    }
    if (arrayIndex === -1 && (!threads || threads.length === 0)) {
      const emptyResultObject = {
        labels,
        threads: [],
        nextPageToken: null,
      }
      state.emailList.push(emptyResultObject)
    }
  }
}

export const emailListSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setSelectedEmails: (
      state,
      { payload }: PayloadAction<Array<ISelectedEmailAction>>
    ) => {
      const loopOverPayload = () => {
        for (let i = 0; i < payload.length; i += 1) {
          const loopingPayload = payload[i]
          if (loopingPayload) {
            const { event, id } = loopingPayload
            if (event === 'add') {
              const currentState = state.selectedEmails
              currentState.selectedIds.push(id)
              const uniqueIds = [...new Set(currentState.selectedIds)]
              state.selectedEmails.selectedIds = uniqueIds
            }
            if (event === 'remove') {
              const currentState = state.selectedEmails
              const filteredResult = currentState.selectedIds.filter(
                (selectedId) => selectedId !== id
              )
              state.selectedEmails.selectedIds = filteredResult
            }
          }
        }
      }
      if (payload.length > 0) {
        const [firstPayload] = payload
        if (firstPayload) {
          if (
            state.selectedEmails?.labelIds &&
            multipleIncludes(
              firstPayload.labelIds,
              state.selectedEmails.labelIds
            )
          ) {
            loopOverPayload()
            return
          }
          const { labelIds } = firstPayload
          state.selectedEmails = { labelIds, selectedIds: [] }
          loopOverPayload()
          return
        }
        state.selectedEmails = initialState.selectedEmails
      }
    },
    setIsFetching: (
      state,
      { payload }: PayloadAction<IEmailListState['isFetching']>
    ) => {
      state.isFetching = payload
    },
    setActiveEmailListIndex: (
      state,
      { payload }: PayloadAction<IEmailListState['activeEmailListIndex']>
    ) => {
      state.activeEmailListIndex = payload
    },
    setBaseEmailList: (state, { payload }: PayloadAction<TBaseEmailList>) => {
      state.emailList = payload
    },
    listAddEmailList: (state, { payload }: PayloadAction<IEmailListObject>) => {
      const { labels, threads, timestamp } = payload
      handleEmailListChange({ state, labels, threads, timestamp })
    },
    /**
     * @function listRemoveItemDetail
     * Takes in a the state and payload, to return a filtered version of an emailList.
     * @param state
     * @param {payload}
     * @returns {void} returns an updated threads inside an emailListItem
     */
    listRemoveItemDetail: (
      state,
      { payload }: PayloadAction<{ threadId: string }>
    ) => {
      const { threadId } = payload
      const emailList = state.emailList ?? {}
      const currentEmailList = emailList[state.activeEmailListIndex]
      if (currentEmailList) {
        currentEmailList.threads = currentEmailList.threads.filter(
          (item) => item.id !== threadId
        )
        state.emailList = emailList
      }
    },

    listRemoveItemDetailDraft: (
      state,
      { payload }: PayloadAction<{ threadId: string }>
    ) => {
      const {
        threadId,
      }: {
        threadId: string
      } = payload
      const currentState = state.emailList
      const currentStateEmailListObject = currentState[4]
      const newStateEmailListObject =
        state.emailList[state.activeEmailListIndex]
      // Index 4 is used, this is the static predefined array based on BASE_ARRAY
      if (currentStateEmailListObject && newStateEmailListObject) {
        currentStateEmailListObject.threads =
          newStateEmailListObject.threads.filter((item) => item.id !== threadId)
        state.emailList = currentState
      }
    },
    /**
     * @function listRemoveItemMessage
     * Takes in a the state and payload, to return a updated version of an emailList.
     * @param state
     * @param {payload}
     * @returns {void} returns an updated message array inside an thread inside an emailListItem
     */
    listRemoveItemMessage: (
      state,
      { payload }: PayloadAction<{ threadId: string; messageId: string }>
    ) => {
      const { threadId, messageId } = payload
      const currentState = state.emailList ?? {}
      const thread = currentState[state.activeEmailListIndex]?.threads.find(
        (t) => t.id === threadId
      )
      if (thread?.messages) {
        const filteredMessages = thread.messages.filter(
          (message) => message.id !== messageId
        )
        if (filteredMessages.length > 0) {
          thread.messages = filteredMessages
          state.emailList = currentState
        }
      }
    },

    listRemoveItemDetailBatch: (
      state,
      { payload }: PayloadAction<{ messageIds: Array<string> }>
    ) => {
      const { messageIds } = payload
      const currentState = state.emailList
      const threadList = currentState[state.activeEmailListIndex]?.threads
      if (currentState && threadList) {
        threadList.filter(
          (thread) => !messageIds.some((id) => thread.id.startsWith(id))
        )
        state.emailList = currentState
      }
    },

    listUpdateSearchResults: (
      state,
      { payload }: PayloadAction<IEmailListObject>
    ) => {
      const { labels, threads, q, nextPageToken, timestamp } = payload
      handleEmailListChange({
        state,
        labels,
        threads,
        nextPageToken,
        q,
        timestamp,
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchEmailsFull.fulfilled,
      (
        state,
        {
          payload: {
            labels,
            response: { threads, nextPageToken, timestamp },
          },
        }
      ) => {
        handleEmailListChange({
          state,
          labels,
          threads,
          nextPageToken,
          timestamp,
        })
      }
    )
    builder.addCase(
      fetchEmailsSimple.fulfilled,
      (
        state,
        {
          payload: {
            labels,
            response: { threads, nextPageToken, timestamp },
            q,
          },
        }
      ) => {
        // If there is a q (query) - send it - this is used to determine if the action is search related.
        handleEmailListChange({
          state,
          labels,
          threads,
          timestamp,
          nextPageToken,
          q,
        })
      }
    )
    builder.addCase(
      fetchEmailDetail.fulfilled,
      (
        state,
        {
          payload: {
            labels,
            response: { threads },
            q,
          },
        }
      ) => {
        // Send the nextPageToken as History - so the original nextPageToken will not be overwritten.
        // Send the timstamp as 0 - so the original timestamp will not be overwritten.
        // If there is a q (query) - send it - this is used to determine if the action is search related.
        handleEmailListChange({
          state,
          labels,
          threads,
          timestamp: global.HISTORY_TIME_STAMP,
          nextPageToken: global.HISTORY_NEXT_PAGETOKEN,
          q,
        })
      }
    )
  },
})

export const {
  listAddEmailList,
  listRemoveItemDetail,
  listRemoveItemDetailBatch,
  listRemoveItemDetailDraft,
  listRemoveItemMessage,
  listUpdateSearchResults,
  setActiveEmailListIndex,
  setBaseEmailList,
  setIsFetching,
  setSelectedEmails,
} = emailListSlice.actions

export const useSearchResults =
  ({
    searchResults,
    currentEmail,
  }: {
    searchResults: IEmailListObject
    currentEmail: string
  }): AppThunk =>
  (dispatch, getState) => {
    const { searchList } = getState().email
    const { coreStatus } = getState().emailDetail
    if (searchList !== searchResults) {
      dispatch(listUpdateSearchResults(searchResults))
    }
    if (coreStatus !== global.CORE_STATUS_MAP.searching) {
      dispatch(setCoreStatus(global.CORE_STATUS_MAP.searching))
      dispatch(setCurrentLabels([global.SEARCH_LABEL]))
    }

    dispatch(
      setViewIndex(
        searchResults.threads.findIndex((item) => item.id === currentEmail)
      )
    )
    dispatch(setCurrentEmail(currentEmail))
    dispatch(push(`/mail/${global.SEARCH_LABEL}/${currentEmail}/messages`))
  }

/**
 * @function loadEmailDetails
 * @param labeledThreads - takes in an object with threads which only contain meta data.
 * @returns - the function updates the Redux state with the found email details.
 */

export const loadEmailDetails =
  (labeledThreads: IEmailListObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { threads, labels, nextPageToken } = labeledThreads
      if (threads) {
        if (threads.length > 0) {
          const buffer: Array<Promise<IEmailListThreadItem>> = []
          for (const thread of threads) {
            buffer.push(threadApi({}).getThreadDetail(thread.id))
          }
          const resolvedThreads = await Promise.all(buffer)
          const onlyObjectThreads = resolvedThreads.filter(
            (thread) => typeof thread !== 'string'
          )
          if (onlyObjectThreads.length === 1) {
            const lastMessage =
              onlyObjectThreads[0]?.messages[
                onlyObjectThreads[0].messages.length - 1
              ]
            if (
              lastMessage &&
              lastMessage.labelIds.includes(global.DRAFT_LABEL)
            ) {
              const { storageLabels } = getState().labels
              const labelNames = onlyObjectThreads[0]?.messages[0]?.labelIds
              if (labelNames) {
                const legalLabels = onlyLegalLabelObjects({
                  storageLabels,
                  labelNames,
                })
                if (legalLabels.length > 0) {
                  for (const label of legalLabels) {
                    dispatch(
                      listAddEmailList({
                        labels: [label.id],
                        threads: onlyObjectThreads,
                        nextPageToken: nextPageToken ?? null,
                      })
                    )
                  }
                }
              }
            } else {
              dispatch(
                listAddEmailList({
                  labels,
                  threads: onlyObjectThreads,
                  nextPageToken: nextPageToken ?? null,
                })
              )
              dispatch(setLoadedInbox(labels))
            }
          }
          getState().utils.isLoading && dispatch(setIsLoading(false))
          getState().utils.isSilentLoading &&
            dispatch(setIsSilentLoading(false))
        }
      } else {
        if (
          !getState().base.baseLoaded &&
          labels.some(
            (val) => getState().labels.loadedInbox.indexOf(val) === -1
          )
        ) {
          dispatch(setLoadedInbox(labels))
        }
        if (
          !getState().base.baseLoaded &&
          getState().labels.storageLabels.length ===
            getState().labels.loadedInbox.length
        ) {
          dispatch(setIsLoading(false))
          getState().utils.isSilentLoading &&
            dispatch(setIsSilentLoading(false))
        }
      }
    } catch (err) {
      process.env.NODE_ENV !== 'production' && console.error(err)
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Unable to update the emails.',
        })
      )
    }
  }

/**
 * @function updateEmailLabel
 * @param props - takes in an object with the default properties of request and labelIds. The other properties are optional.
 * @returns {void} - based on the properties other Redux actions and/or Gmail API requests are made.
 */
export const updateEmailLabel =
  ({
    threadId,
    request,
    request: { removeLabelIds },
    labelIds,
  }: IUpdateRequestParamsSingle): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { coreStatus, viewIndex } = getState().emailDetail
      const { activeEmailListIndex, emailList, searchList } = getState().email
      const { isSilentLoading } = getState().utils
      const staticActiveEmailList =
        activeEmailListIndex === -1
          ? searchList
          : emailList[activeEmailListIndex]

      if (
        staticActiveEmailList &&
        Object.keys(staticActiveEmailList).length > 0
      ) {
        if (
          getState().router.location?.pathname.includes('/mail/') &&
          !getState().labels.labelIds.includes(global.DRAFT_LABEL)
        ) {
          // The push route method should only work when the action is Archive, ToDo or Delete via Detail actions and the user is on the email detail page (/mail/).
          // This action is done first, to speed up the UX.
          if (
            (request?.removeLabelIds &&
              !request?.removeLabelIds.includes(global.UNREAD_LABEL)) ||
            request?.delete
          ) {
            const blockViewIndexUpdate = true
            const forceNavigateBack =
              !coreStatus || coreStatus === global.CORE_STATUS_MAP.searching
            dispatch(navigateNextMail(blockViewIndexUpdate, forceNavigateBack))
            if (staticActiveEmailList.threads.length - 1 - viewIndex <= 4) {
              const { emailFetchSize } = getState().utils
              edgeLoadingNextPage({
                activeEmailList: staticActiveEmailList,
                dispatch,
                emailFetchSize,
                isSilentLoading,
                labelIds,
              })
            }
          }
        }

        // If the request is NOT to delete the message, it is a request to update the label. Send the request for updating the thread or message to the Gmail API.
        if (!request.delete) {
          try {
            if (threadId) {
              await threadApi({}).updateThread({
                threadId,
                request,
              })
            }
          } catch (err) {
            dispatch(
              setSystemStatusUpdate({
                type: 'error',
                message: 'Error updating label.',
              })
            )
          }
        }
        // If the request is to delete the thread or message, dispatch the thrash action to the Gmail API.
        if (request.delete) {
          try {
            if (threadId) {
              threadApi({}).thrashThread({
                threadId,
              })
            }
          } catch (err) {
            dispatch(
              setSystemStatusUpdate({
                type: 'error',
                message: 'Error updating label.',
              })
            )
          }
        }
        // If the request is to delete the thread or message, or to remove a label (except the unread label)
        if (
          (removeLabelIds && !removeLabelIds.includes(global.UNREAD_LABEL)) ||
          request.delete
        ) {
          dispatch(
            listRemoveItemDetail({
              threadId,
            })
          )
        }
      } else {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: 'Error updating label.',
          })
        )
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Error updating label.',
        })
      )
    }
  }

export const updateEmailLabelBatch =
  ({
    request,
    request: { removeLabelIds },
  }: IUpdateRequestParamsBatch): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { selectedEmails } = getState().email
      if (
        (removeLabelIds && !removeLabelIds.includes(global.UNREAD_LABEL)) ||
        request.delete
      ) {
        dispatch(
          listRemoveItemDetailBatch({
            messageIds: selectedEmails.selectedIds,
          })
        )
      }
      for (let i = 0; i < selectedEmails.selectedIds.length; i += 1) {
        if (!request.delete) {
          const selectedId = selectedEmails.selectedIds[i]
          if (selectedId) {
            try {
              threadApi({}).updateThread({
                threadId: selectedId,
                request,
              })
            } catch (err) {
              dispatch(
                setSystemStatusUpdate({
                  type: 'error',
                  message: 'Error updating label.',
                })
              )
            }
          } else {
            dispatch(
              setSystemStatusUpdate({
                type: 'error',
                message: 'Error updating label.',
              })
            )
          }
        }
        if (request.delete) {
          const selectedId = selectedEmails.selectedIds[i]
          if (selectedId) {
            try {
              threadApi({}).thrashThread({
                threadId: selectedId,
              })
            } catch (err) {
              dispatch(
                setSystemStatusUpdate({
                  type: 'error',
                  message: 'Error updating label.',
                })
              )
            }
          } else {
            dispatch(
              setSystemStatusUpdate({
                type: 'error',
                message: 'Error updating label.',
              })
            )
          }
        }
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Error updating label.',
        })
      )
    }
  }

export const updateMessageLabel =
  ({
    threadId,
    messageId,
    request,
  }: {
    messageId: string
    threadId: string
    request: IUpdateRequest
  }): AppThunk =>
  async (dispatch) => {
    if (request.delete) {
      try {
        await messageApi().thrashMessage({ messageId })
      } catch {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: 'Error updating label.',
          })
        )
      }
    }

    dispatch(
      listRemoveItemMessage({
        messageId,
        threadId,
      })
    )
  }

/**
 * @function refreshEmailFeed
 * Use profile history id, compare this to the received history id. If the received history id is higher than stored version. Refetch the email list for inbox only.
 * @returns {void} dispatches an aciton based on the received history id and history object (sortedFeeds).
 */

export const refreshEmailFeed = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setIsFetching(true))
    const { storageLabels } = getState().labels
    const savedHistoryId = parseInt(getState().base.profile.historyId, 10)
    const response = await historyApi().listHistory(
      savedHistoryId,
      storageLabels
    )
    if (response?.status === 200) {
      const { history } = response.data
      if (history) {
        for (let i = 0; i < history.length; i += 1) {
          dispatch(loadEmailDetails(history[i]))
        }
      }
      const { data } = await userApi().fetchUser()
      const { signature } = getState().base.profile
      dispatch(setProfile({ signature, ...data }))
      handleSessionStorage(global.LAST_REFRESH, Date.now().toString())
    } else {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Unable to refresh the feed.',
        })
      )
    }
  } catch (err) {
    const typedError: any = err
    process.env.NODE_ENV === 'development' &&
      console.error(typedError.response.message)
    dispatch(
      setSystemStatusUpdate({
        type: 'error',
        message: 'Unable to refresh the feed.',
      })
    )
  } finally {
    dispatch(setIsFetching(false))
  }
}

export const selectIsFetching = (state: RootState) => state.email.isFetching
export const selectActiveEmailListIndex = (state: RootState) =>
  state.email.activeEmailListIndex
export const selectEmailList = (state: RootState) => state.email.emailList
export const selectSearchList = (state: RootState) => state.email.searchList
export const selectSelectedEmails = (state: RootState) =>
  state.email.selectedEmails

export default emailListSlice.reducer
