/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'
import threadApi, { EmailQueryObject } from '../data/threadApi'
import {
  navigateBack,
  setIsLoading,
  setIsProcessing,
  setIsSilentLoading,
  setServiceUnavailable,
} from './utilsSlice'
import { setCurrentLabels, setLoadedInbox } from './labelsSlice'
import messageApi from '../data/messageApi'
import * as global from '../constants/globalConstants'
import type { AppThunk, RootState } from './store'
import {
  IEmailListObject,
  IEmailListState,
  IEmailListObjectSearch,
} from './storeTypes/emailListTypes'
import {
  UpdateRequestParamsBatch,
  UpdateRequestParamsSingle,
} from './storeTypes/metaEmailListTypes'
import sortThreads from '../utils/sortThreads'
import undoubleThreads from '../utils/undoubleThreads'
import {
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
import handleHistoryObject, {
  HISTORY_NEXT_PAGETOKEN,
} from '../utils/handleHistoryObject'
import handleSessionStorage from '../utils/handleSessionStorage'
import onlyLegalLabels from '../utils/onlyLegalLabelObjects'

export const fetchEmails = createAsyncThunk(
  'email/fetchEmails',
  async (query: EmailQueryObject, { dispatch, signal }) => {
    const response = await threadApi({ signal }).getFullThreads(query)
    dispatch(setLoadedInbox(query.labelIds))
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
    listAddEmailList: (state, { payload }) => {
      if (payload.labels) {
        // Find emailList sub-array index
        const arrayIndex: number = state.emailList
          .map((emailArray) => emailArray.labels)
          .flat(1)
          .findIndex((obj) => (obj ? obj.includes(payload.labels) : null))
        // If emailList sub-array index exists, if exists concat threads.
        // If not, push the new emailList
        if (arrayIndex > -1) {
          // It loops through all the newly fetched threads, and if check what to do with this.
          // Either push it to the tempArray, or update the entry in the emailList state.
          const tempArray: any = []
          let activeCount: number = 0
          const completeCount: number = payload.threads.length

          for (let i = 0; i < completeCount; i += 1) {
            // Check if the thread already exists on the Redux store.
            const threadIndex = state.emailList[arrayIndex].threads.findIndex(
              (thread) => thread.id === payload.threads[i].id
            )

            if (threadIndex === -1) {
              activeCount += 1
              tempArray.push(payload.threads[i])
            }

            if (threadIndex > -1) {
              activeCount += 1
              const currentState = state.emailList
              currentState[arrayIndex].threads[threadIndex] = payload.threads[i]
              state.emailList = currentState
            }

            if (activeCount === completeCount) {
              const currentState = state.emailList
              const sortedThreads = sortThreads(
                currentState[arrayIndex].threads.concat(tempArray)
              )

              const newObject: IEmailListObject = {
                labels: payload.labels,
                threads: undoubleThreads(sortedThreads),
                nextPageToken:
                  payload.nextPageToken === HISTORY_NEXT_PAGETOKEN
                    ? state.emailList[arrayIndex].nextPageToken
                    : payload.nextPageToken,
              }
              currentState[arrayIndex] = newObject
              state.emailList = currentState
            }
          }
        }
        if (arrayIndex === -1) {
          const sortedThreads = sortThreads(payload.threads)

          const sortedEmailList: IEmailListObject = {
            ...payload,
            threads: undoubleThreads(sortedThreads),
          }
          state.emailList.push(sortedEmailList)
        }
      }
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
    /**
     * @function listRemoveItemMessage
     * Takes in a the state and payload, to return a updated version of an emailList.
     * @param state
     * @param {payload}
     * @returns {void} returns an updated message array inside an thread inside an emailListItem
     */
    listRemoveItemMessage: (state, { payload }) => {
      const {
        threadId,
        messageId,
      }: {
        threadId: string
        messageId: string
      } = payload

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
      currentState[state.activeEmailListIndex].threads[threadIndex].messages =
        filteredMessages()
      state.emailList = currentState
    },
    listRemoveItemDetailBatch: (state, action) => {
      const {
        messageIds,
      }: {
        messageIds: string[]
      } = action.payload
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
    listUpdateSearchResults: (state, action) => {
      state.searchList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchEmails.fulfilled,
      // TODO: Refactor code to remove duplication
      (state, { payload: { labels, response } }) => {
        if (labels && response.threads) {
          // Find emailList sub-array index
          const arrayIndex: number = state.emailList
            .map((emailArray) => emailArray.labels)
            .flat(1)
            .findIndex((obj) => (obj ? obj.includes(labels[0]) : null))
          // If emailList sub-array index exists, if exists concat threads.
          // If not, push the new emailList
          if (arrayIndex > -1) {
            // It loops through all the newly fetched threads, and if check what to do with this.
            // Either push it to the tempArray, or update the entry in the emailList state.
            const tempArray: any = []
            let activeCount: number = 0
            const completeCount: number = response.threads.length

            for (let i = 0; i < completeCount; i += 1) {
              // Check if the object already exists on the Redux store.
              const threadIndex = state.emailList[arrayIndex].threads.findIndex(
                (thread) => thread.id === response.threads[i].id
              )

              if (threadIndex === -1) {
                activeCount += 1
                tempArray.push(response.threads[i])
              }

              if (threadIndex > -1) {
                activeCount += 1
                const currentState = state.emailList
                currentState[arrayIndex].threads[threadIndex] =
                  response.threads[i]
                state.emailList = currentState
              }

              if (activeCount === completeCount) {
                const currentState = state.emailList
                const sortedThreads = sortThreads(
                  currentState[arrayIndex].threads.concat(tempArray)
                )

                const newObject: IEmailListObject = {
                  labels,
                  threads: undoubleThreads(sortedThreads),
                  nextPageToken: response.nextPageToken ?? null,
                }
                currentState[arrayIndex] = newObject
                state.emailList = currentState
              }
            }
          }
          if (arrayIndex === -1) {
            const sortedThreads = sortThreads(response.threads)

            const sortedEmailList: IEmailListObject = {
              ...response,
              labels,
              threads: undoubleThreads(sortedThreads),
            }
            state.emailList.push(sortedEmailList)
          }
        }
        if (labels && !response.threads) {
          const emptyResultObject = {
            labels,
            threads: [],
            nextPageToken: null,
          }
          state.emailList.push(emptyResultObject)
        }
      }
    )
  },
})

export const {
  setSelectedEmails,
  setIsFetching,
  setActiveEmailListIndex,
  listAddEmailList,
  listRemoveItemDetail,
  listRemoveItemMessage,
  listRemoveItemDetailBatch,
  listUpdateSearchResults,
} = emailListSlice.actions

export const storeSearchResults =
  (searchResults: IEmailListObjectSearch): AppThunk =>
  (dispatch, getState) => {
    const { searchList } = getState().email
    if (searchList && searchResults.q === searchList.q) {
      const sortedThreads = sortThreads(
        searchList.threads.concat(searchResults.threads)
      )
      const newSearchList = {
        q: searchList.q,
        nextPageToken: searchResults.nextPageToken,
        threads: undoubleThreads(sortedThreads),
      }
      dispatch(listUpdateSearchResults(newSearchList))
    } else {
      dispatch(listUpdateSearchResults(searchResults))
    }
  }

export const useSearchResults =
  ({
    searchResults,
    currentEmail,
  }: {
    searchResults: IEmailListObjectSearch
    currentEmail: string
  }): AppThunk =>
  (dispatch, getState) => {
    const { searchList } = getState().email
    const { coreStatus } = getState().emailDetail
    if (searchList !== searchResults) {
      dispatch(storeSearchResults(searchResults))
    }
    if (coreStatus !== global.CORE_STATUS_SEARCHING) {
      dispatch(setCoreStatus(global.CORE_STATUS_SEARCHING))
      dispatch(setCurrentLabels([global.ARCHIVE_LABEL]))
    }
    dispatch(
      setViewIndex(
        searchResults.threads.findIndex((item) => item.id === currentEmail)
      )
    )
    dispatch(setCurrentEmail(currentEmail))
    dispatch(push(`/mail/${global.ARCHIVE_LABEL}/${currentEmail}/messages`))
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
          const buffer: any = []
          threads.forEach((thread) =>
            // TODO: Alter all input to have the threadId as input
            buffer.push(threadApi({}).getThreadDetail(thread.id))
          )
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
            const legalLabels = onlyLegalLabels({ storageLabels, labelNames })
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
          getState().utils.isSilentLoading &&
            dispatch(setIsSilentLoading(false))
        }
      } else {
        if (
          !getState().base.baseLoaded &&
          labels.some(
            (val) => getState().labels.loadedInbox.flat(1).indexOf(val) === -1
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
      dispatch(setServiceUnavailable('Error hydrating emails.'))
    }
  }

/**
 * @function updateEmailLabel
 * @param props - takes in an object with the default properties of request and labelIds. The other properties are optional.
 * @returns {void} - based on the properties other Redux actions and/or GMail API requests are made.
 */
export const updateEmailLabel = (
  props: UpdateRequestParamsSingle
): AppThunk => {
  const {
    threadId,
    request,
    request: { removeLabelIds },
    labelIds,
    location,
  } = props
  return async (dispatch, getState) => {
    try {
      const { coreStatus } = getState().emailDetail
      const { emailList, searchList } = getState().email
      const { isSilentLoading } = getState().utils
      const staticIndexActiveEmailList = getState().email.activeEmailListIndex
      const staticActiveEmailList =
        staticIndexActiveEmailList === -1
          ? searchList
          : emailList[getState().email.activeEmailListIndex]

      if (
        staticActiveEmailList &&
        Object.keys(staticActiveEmailList).length > 0
      ) {
        // TODO: Revert this change whenever Redux First History is working again.
        if (
          location?.pathname.includes('/mail/') &&
          !getState().labels.labelIds.includes(global.DRAFT_LABEL)
        ) {
          // if (
          //   getState().router.location?.pathname.includes('/mail/') &&
          //   !getState().labels.labelIds.includes(global.DRAFT_LABEL)
          // ) {
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

        // If the request is NOT to delete the message, it is a request to update the label. Send the request for updating the thread or message to the GMail API.
        if (!request.delete) {
          try {
            dispatch(setIsProcessing(true))
            let response = null
            if (threadId) {
              response = await threadApi({}).updateThread({
                threadId,
                request,
              })
            }
            // if (messageId) {
            //   response = await messageApi().updateMessage({
            //     messageId,
            //     request,
            //   })
            // }
            if (response) {
              dispatch(setIsProcessing(false))
            }
          } catch (err) {
            dispatch(setServiceUnavailable('Error updating label.'))
          }
        }
        // If the request is to delete the thread or message, dispatch the thrash action to the GMail API.
        if (request.delete) {
          try {
            if (threadId) {
              await threadApi({}).thrashThread({
                threadId,
              })
            }
            // if (messageId) {
            //   await messageApi().thrashMessage({ messageId })
            // }
          } catch (err) {
            dispatch(setServiceUnavailable('Error updating label.'))
          }
        }
        // If the request is to delete the thread or message, or to remove a label (expect the unread label) - remove the item from the Redux store.
        if (
          (removeLabelIds && !removeLabelIds.includes(global.UNREAD_LABEL)) ||
          request.delete
        ) {
          dispatch(
            listRemoveItemDetail({
              threadId,
              staticIndexActiveEmailList,
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
      const { emailList, selectedEmails, searchList } = getState().email

      const staticIndexActiveEmailList = getState().email.activeEmailListIndex
      const staticActiveEmailList =
        staticIndexActiveEmailList === -1
          ? searchList
          : emailList[getState().email.activeEmailListIndex]

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

/**
 * @function refreshEmailFeed
 * Use profile history id, compare this to the received history id. If the received history id is higher than stored version. Refetch the email list for inbox only.
 * @returns {void} dispatches an aciton based on the received history id and history object (sortedFeeds).
 */

export const refreshEmailFeed = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setIsFetching(true))
    const savedHistoryId = parseInt(getState().base.profile.historyId, 10)
    const response = await historyApi().listHistory(savedHistoryId)
    if (response?.status === 200) {
      const { history } = response.data
      if (history) {
        const { loadedInbox, storageLabels } = getState().labels
        const sortedFeeds = handleHistoryObject({ history, storageLabels })
        // Skip the feed, if the feed hasn't loaded yet - except for DRAFTS.
        for (let i = 0; i < sortedFeeds.length; i += 1) {
          for (let j = 0; j < loadedInbox.length; j += 1) {
            if (
              sortedFeeds[i].labels.includes(loadedInbox[j][0]) ||
              sortedFeeds[i].labels.includes(global.DRAFT_LABEL)
            ) {
              dispatch(loadEmailDetails(sortedFeeds[i]))
            }
          }
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
