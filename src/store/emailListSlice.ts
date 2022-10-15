/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'
import threadApi, { EmailQueryObject } from '../data/threadApi'
import {
  navigateBack,
  setIsLoading,
  setIsSilentLoading,
  setServiceUnavailable,
} from './utilsSlice'
import { setCurrentLabels, setLoadedInbox } from './labelsSlice'
import * as global from '../constants/globalConstants'
import type { AppThunk, RootState } from './store'
import {
  IEmailListObject,
  IEmailListState,
  IEmailListThreadItem,
  TBaseEmailList,
} from './storeTypes/emailListTypes'
import {
  UpdateRequest,
  UpdateRequestParamsBatch,
  UpdateRequestParamsSingle,
} from './storeTypes/metaEmailListTypes'
import sortThreads from '../utils/sortThreads'
import undoubleThreads from '../utils/undoubleThreads'
import {
  fetchEmailDetail,
  setCoreStatus,
  setCurrentEmail,
  setSessionViewIndex,
  setViewIndex,
} from './emailDetailSlice'
import userApi from '../data/userApi'
import historyApi from '../data/historyApi'
import { setProfile } from './baseSlice'
import labelURL from '../utils/createLabelURL'
import { edgeLoadingNextPage } from '../utils/loadNextPage'
import handleSessionStorage from '../utils/handleSessionStorage'
import { onlyLegalLabelObjects } from '../utils/onlyLegalLabels'
import messageApi from '../data/messageApi'

export const fetchEmailsSimple = createAsyncThunk(
  'email/fetchEmailsSimple',
  async (query: EmailQueryObject, { signal }) => {
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
  async (query: EmailQueryObject, { signal }) => {
    const response = await threadApi({ signal }).getFullThreads(query)
    return { response: response.data, labels: query.labelIds }
  }
)

const initialState: IEmailListState = Object.freeze({
  emailList: [],
  selectedEmails: [],
  searchList: null,
  activeEmailListIndex: -1,
  isFetching: false,
})

const handleAdditionToExistingEmailArray = ({
  targetEmailListObject,
  state,
  labels,
  threads,
  timestamp,
  arrayIndex,
  nextPageToken,
  q,
}: {
  targetEmailListObject: IEmailListObject
  state: IEmailListState
  labels: string[]
  threads: IEmailListThreadItem[]
  timestamp: number
  arrayIndex?: number
  nextPageToken?: undefined | string | null
  q?: undefined | string
}) => {
  const tempArray: IEmailListThreadItem[] = []
  let activeCount: number = 0
  const completeCount: number = threads.length

  for (let i = 0; i < completeCount; i += 1) {
    // Check if the object already exists on the Redux store.
    const threadIndex = targetEmailListObject.threads.findIndex(
      (thread) => thread.id === threads[i].id
    )

    // The object doesn't exist in the Redux store
    if (threadIndex === -1) {
      activeCount += 1
      tempArray.push(threads[i])
    }

    // The object exists in the Redux store
    if (threadIndex > -1) {
      activeCount += 1
      targetEmailListObject.threads[threadIndex] = threads[i]
    }

    if (activeCount === completeCount) {
      const sortedThreads = sortThreads(
        targetEmailListObject.threads.concat(tempArray), labels.includes(global.DRAFT_LABEL)
      )

      // Here we create the final object that will be pushed to the Redux state
      // If the timestamp and/or nextPageToken are history values, maintain the original version.
      // TODO: Verify if the removal of the nextPageToken on the object is detrimental to the behavior, e.g. will it be able to readd the nextPageToken once it does have one?
      const newObject: IEmailListObject = {
        labels,
        threads: undoubleThreads(sortedThreads),
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
}

const handleEmailListChange = ({
  state,
  labels,
  threads,
  timestamp,
  nextPageToken,
  q,
}: {
  state: IEmailListState
  labels: string[] | undefined
  threads: IEmailListThreadItem[]
  timestamp: number
  nextPageToken?: undefined | string | null
  q?: string
}) => {
  // The flow can only work if there are labels to use
  if (labels) {
    // Find emailList sub-array index
    const arrayIndex: number = state.emailList
      .map((emailArray) => emailArray.labels)
      .flat(1)
      .findIndex((obj) => (obj ? obj.includes(labels[0]) : null))
    if (threads && threads.length > 0) {
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
      if (arrayIndex === -1 && !labels.includes(global.SEARCH_LABEL)) {
        const sortedThreads = sortThreads(threads)

        const sortedEmailList: IEmailListObject = {
          nextPageToken,
          labels,
          threads: undoubleThreads(sortedThreads),
        }
        state.emailList.push(sortedEmailList)
      }
      return
    }
    // if (arrayIndex > -1 && (!threads || threads.length === 0)) {
    //   const emptyResultObject = {
    //     labels,
    //     threads: [],
    //     nextPageToken: null,
    //   }
    //   state.emailList.push(emptyResultObject)
    // }
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
    setSelectedEmails: (state, { payload }: PayloadAction<any>) => {
      if (payload.length > 0) {
        for (let i = 0; i < payload.length; i += 1) {
          const { event, id } = payload[i]
          if (event === 'add') {
            const currentState = state.selectedEmails
            currentState.push(id)
            state.selectedEmails = currentState
          }
          if (event === 'remove') {
            const currentState = state.selectedEmails
            const filteredResult = currentState.filter((item) => item !== id)
            state.selectedEmails = filteredResult
          }
        }
        return
      }
      state.selectedEmails = initialState.selectedEmails
    },
    setIsFetching: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetching = payload
    },
    setActiveEmailListIndex: (state, { payload }: PayloadAction<number>) => {
      state.activeEmailListIndex = payload
    },
    setBaseEmailList: (state, { payload }: PayloadAction<TBaseEmailList>) => {
      state.emailList = payload
    },
    listAddEmailList: (state, { payload }) => {
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
    listRemoveItemDetail: (state, { payload }) => {
      const {
        threadId,
      }: {
        threadId: string
      } = payload
      const currentState = state.emailList
      currentState[state.activeEmailListIndex].threads = state.emailList[
        state.activeEmailListIndex
      ].threads.filter((item) => item.id !== threadId)
      state.emailList = currentState
    },
    listRemoveItemDetailDraft: (state, { payload }) => {
      const {
        threadId,
      }: {
        threadId: string
      } = payload
      const currentState = state.emailList
      // Index 4 is used, this is the static predefined array based on BASE_ARRAY
      currentState[4].threads = state.emailList[
        state.activeEmailListIndex
      ].threads.filter((item) => item.id !== threadId)
      state.emailList = currentState
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
      {
        payload,
      }: {
        payload: {
          threadId: string
          messageId: string
        }
      }
    ) => {
      const { threadId, messageId } = payload

      const filteredMessages = () => {
        const relevantThreads =
          state.emailList[state.activeEmailListIndex].threads
        const relevantMessagesFeed =
          relevantThreads[
            relevantThreads.findIndex((thread) => thread.id === threadId)
          ].messages
        return relevantMessagesFeed.filter(
          (message) => message.id !== messageId
        )
      }
      const threadIndex = state.emailList[
        state.activeEmailListIndex
      ].threads.findIndex((thread) => thread.id === threadId)

      const currentState = state.emailList
      currentState[state.activeEmailListIndex].threads[
        threadIndex
      ].messages = filteredMessages()
      state.emailList = currentState
    },
    listRemoveItemDetailBatch: (state, { payload }) => {
      const {
        messageIds,
      }: {
        messageIds: string[]
      } = payload
      const filterArray = () => {
        const activeEmailListThreads =
          state.emailList[state.activeEmailListIndex].threads
        const filtered = activeEmailListThreads.filter(
          (el) => messageIds.indexOf(el.id) === -1
        )
        return filtered
      }
      const currentState = state.emailList
      currentState[state.activeEmailListIndex].threads = filterArray()
      state.emailList = currentState
    },
    listUpdateSearchResults: (state, { payload }) => {
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
  setSelectedEmails,
  setIsFetching,
  setActiveEmailListIndex,
  setBaseEmailList,
  listAddEmailList,
  listRemoveItemDetail,
  listRemoveItemDetailDraft,
  listRemoveItemMessage,
  listRemoveItemDetailBatch,
  listUpdateSearchResults,
} = emailListSlice.actions

export const useSearchResults = ({
  searchResults,
  currentEmail,
}: {
  searchResults: IEmailListObject
  currentEmail: string
}): AppThunk => (dispatch, getState) => {
  const { searchList } = getState().email
  const { coreStatus } = getState().emailDetail
  if (searchList !== searchResults) {
    dispatch(listUpdateSearchResults(searchResults))
  }
  if (coreStatus !== global.CORE_STATUS_SEARCHING) {
    dispatch(setCoreStatus(global.CORE_STATUS_SEARCHING))
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

export const loadEmailDetails = (
  labeledThreads: IEmailListObject
): AppThunk => async (dispatch, getState) => {
  try {
    const { threads, labels, nextPageToken } = labeledThreads
    if (threads) {
      if (threads.length > 0) {
        const buffer: Promise<IEmailListThreadItem>[] = []
        threads.forEach((thread) =>
          // TODO: Alter all input to have the threadId as input
          buffer.push(threadApi({}).getThreadDetail(thread.id))
        )
        // TODO: Since the history api doesn't give back any other label information than Draft - we need to check for the original source and create it
        const resolvedThreads = await Promise.all(buffer)
        const onlyObjectThreads = resolvedThreads.filter(
          (thread) => typeof thread !== 'string'
        )
        // If the object is only of length 1, then it could mean that it is an update from draft.
        // If that is the case, attempt to find the original label id of the thread to store the object.
        if (
          onlyObjectThreads[0].messages[
            onlyObjectThreads[0].messages.length - 1
          ].labelIds.includes(global.DRAFT_LABEL)
        ) {
          const { storageLabels } = getState().labels
          const labelNames = onlyObjectThreads[0].messages[0].labelIds
          const legalLabels = onlyLegalLabelObjects({
            storageLabels,
            labelNames,
          })
          if (legalLabels.length > 0) {
            legalLabels.forEach((label) =>
              dispatch(
                listAddEmailList({
                  labels: label.id,
                  threads: onlyObjectThreads,
                  nextPageToken: nextPageToken ?? null,
                })
              )
            )
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
        getState().utils.isLoading && dispatch(setIsLoading(false))
        getState().utils.isSilentLoading && dispatch(setIsSilentLoading(false))
      }
    } else {
      if (
        !getState().base.baseLoaded &&
        labels.some((val) => getState().labels.loadedInbox.indexOf(val) === -1)
      ) {
        dispatch(setLoadedInbox(labels))
      }
      if (
        !getState().base.baseLoaded &&
        getState().labels.storageLabels.length ===
          getState().labels.loadedInbox.length
      ) {
        dispatch(setIsLoading(false))
        getState().utils.isSilentLoading && dispatch(setIsSilentLoading(false))
      }
    }
  } catch (err) {
    process.env.NODE_ENV !== 'production' && console.error(err)
    dispatch(setServiceUnavailable('Error hydrating emails.'))
  }
}

/**
 * @function updateEmailLabel
 * @param props - takes in an object with the default properties of request and labelIds. The other properties are optional.
 * @returns {void} - based on the properties other Redux actions and/or Gmail API requests are made.
 */
export const updateEmailLabel = ({
  threadId,
  request,
  request: { removeLabelIds },
  labelIds,
}: UpdateRequestParamsSingle): AppThunk => async (dispatch, getState) => {
  try {
    const { coreStatus } = getState().emailDetail
    const { activeEmailListIndex, emailList, searchList } = getState().email
    const { isSilentLoading } = getState().utils
    const staticActiveEmailList =
      activeEmailListIndex === -1 ? searchList : emailList[activeEmailListIndex]

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
          const { viewIndex, sessionViewIndex } = getState().emailDetail
          const nextID =
            staticActiveEmailList.threads[viewIndex + 1] !== undefined
              ? staticActiveEmailList.threads[viewIndex + 1].id
              : null

          const staticLabelURL = labelURL(labelIds)
          if (coreStatus && nextID) {
            dispatch(setCurrentEmail(nextID))
            dispatch(setSessionViewIndex(sessionViewIndex + 1))
            dispatch(push(`/mail/${staticLabelURL}/${nextID}/messages`))
            if (staticActiveEmailList.threads.length - 1 - viewIndex <= 4) {
              const { emailFetchSize } = getState().utils
              edgeLoadingNextPage({
                isSilentLoading,
                dispatch,
                labelIds,
                emailFetchSize,
                activeEmailList: staticActiveEmailList,
              })
            }
          }
          if (!coreStatus || (coreStatus && !nextID)) {
            dispatch(navigateBack())
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
          dispatch(setServiceUnavailable('Error updating label.'))
        }
      }
      // If the request is to delete the thread or message, dispatch the thrash action to the Gmail API.
      if (request.delete) {
        try {
          if (threadId) {
            await threadApi({}).thrashThread({
              threadId,
            })
          }
        } catch (err) {
          dispatch(setServiceUnavailable('Error updating label.'))
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
      dispatch(setServiceUnavailable('Error updating label.'))
    }
  } catch (err) {
    dispatch(setServiceUnavailable('Error updating label.'))
  }
}

export const updateEmailLabelBatch = (
  props: UpdateRequestParamsBatch
): AppThunk => {
  const {
    request,
    request: { removeLabelIds },
  } = props

  return async (dispatch, getState) => {
    try {
      const {
        activeEmailListIndex,
        emailList,
        selectedEmails,
        searchList,
      } = getState().email
      const staticActiveEmailList =
        activeEmailListIndex === -1
          ? searchList
          : emailList[activeEmailListIndex]

      if (
        staticActiveEmailList &&
        Object.keys(staticActiveEmailList).length > 0
      ) {
        if (
          (removeLabelIds && !removeLabelIds.includes(global.UNREAD_LABEL)) ||
          request.delete
        ) {
          dispatch(
            listRemoveItemDetailBatch({
              messageIds: selectedEmails,
            })
          )
        }
        for (let i = 0; i < selectedEmails.length; i += 1) {
          if (!request.delete) {
            try {
              threadApi({}).updateThread({
                threadId: selectedEmails[i],
                request,
              })
            } catch (err) {
              dispatch(setServiceUnavailable('Error updating label.'))
            }
          }
          if (request.delete) {
            try {
              threadApi({}).thrashThread({ threadId: selectedEmails[i] })
            } catch (err) {
              dispatch(setServiceUnavailable('Error updating label.'))
            }
          }
        }
      } else {
        dispatch(setServiceUnavailable('Error updating label.'))
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error updating label.'))
    }
  }
}

export const updateMessageLabel = ({
  threadId,
  messageId,
  request,
}: {
  messageId: string
  threadId: string
  request: UpdateRequest
}): AppThunk => async (dispatch) => {
  if (request.delete) {
    try {
      await messageApi().thrashMessage({ messageId })
    } catch {
      dispatch(setServiceUnavailable('Error updating label.'))
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
      dispatch(setServiceUnavailable('Cannot refresh feed'))
    }
  } catch (err) {
    const typedError: any = err
    process.env.NODE_ENV === 'development' &&
      console.error(typedError.response.message)
    dispatch(setServiceUnavailable('Cannot refresh feed'))
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
