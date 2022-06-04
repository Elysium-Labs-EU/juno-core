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
import messageApi from '../data/messageApi'
import * as global from '../constants/globalConstants'
import type { AppThunk, RootState } from './store'
import {
  IEmailListThreadItem,
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
  setCurrentEmail,
  setCurrentMessage,
  setSessionViewIndex,
  setViewIndex,
} from './emailDetailSlice'
import userApi from '../data/userApi'
import historyApi from '../data/historyApi'
import { setProfile } from './baseSlice'
import labelURL from '../utils/createLabelURL'
import { edgeLoadingNextPage } from '../utils/loadNextPage'
import handleHistoryObject from '../utils/handleHistoryObject'
import handleSessionStorage from '../utils/handleSessionStorage'

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
  coreStatus: null,
  isFetching: false,
})

export const emailListSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setCoreStatus: (state, { payload }: PayloadAction<string | null>) => {
      state.coreStatus = payload
    },
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
            // Check if the object already exists on the Redux store.
            const objectIndex = state.emailList[arrayIndex].threads.findIndex(
              (item) => item.id === payload.threads[i].id
            )

            if (objectIndex === -1) {
              activeCount += 1
              tempArray.push(payload.threads[i])
            }

            if (objectIndex > -1) {
              activeCount += 1
              const currentState = state.emailList
              currentState[arrayIndex].threads[objectIndex] = payload.threads[i]
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
                nextPageToken: payload.nextPageToken ?? null,
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
    listRemoveItemDetail: (state, { payload }) => {
      const {
        messageId,
      }: {
        messageId: string
      } = payload
      const newEmailListEntry: IEmailListObject = {
        ...state.emailList[state.activeEmailListIndex],
        threads: state.emailList[state.activeEmailListIndex].threads.filter(
          (item: IEmailListThreadItem) => item.id !== messageId
        ),
      }
      const updatedEmailList: IEmailListObject[] = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(
              state.emailList[state.activeEmailListIndex].labels[0]
            )
        ),
        newEmailListEntry,
      ]
      state.emailList = updatedEmailList
    },
    listRemoveItemDetailBatch: (state, action) => {
      const {
        messageIds,
      }: {
        messageIds: string[]
      } = action.payload
      const activeEmailListThreads =
        state.emailList[state.activeEmailListIndex].threads

      const filterArray = () => {
        const filtered = activeEmailListThreads.filter(
          (el) => messageIds.indexOf(el.id) === -1
        )
        return filtered
      }
      const newEmailListEntry: IEmailListObject = {
        ...state.emailList[state.activeEmailListIndex],
        threads: filterArray(),
      }
      const updatedEmailList: IEmailListObject[] = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(
              state.emailList[state.activeEmailListIndex].labels[0]
            )
        ),
        newEmailListEntry,
      ]
      state.emailList = updatedEmailList
    },
    listUpdateSearchResults: (state, action) => {
      state.searchList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchEmails.fulfilled,
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
              const objectIndex = state.emailList[arrayIndex].threads.findIndex(
                (item) => item.id === response.threads[i].id
              )

              if (objectIndex === -1) {
                activeCount += 1
                tempArray.push(response.threads[i])
              }

              if (objectIndex > -1) {
                activeCount += 1
                const currentState = state.emailList
                currentState[arrayIndex].threads[objectIndex] =
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
  setCoreStatus,
  setSelectedEmails,
  setIsFetching,
  setActiveEmailListIndex,
  listAddEmailList,
  listRemoveItemDetail,
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
    const { coreStatus, searchList } = getState().email
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

export const loadEmailDetails =
  (labeledThreads: IEmailListObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { threads, labels, nextPageToken } = labeledThreads
      if (threads) {
        const buffer: any = []

        if (threads.length > 0) {
          threads.forEach((thread) =>
            buffer.push(threadApi({}).getThreadDetail(thread.id))
          )
          dispatch(
            listAddEmailList({
              labels,
              threads: await Promise.all(buffer),
              nextPageToken: nextPageToken ?? null,
            })
          )
          dispatch(setLoadedInbox(labels))
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
      dispatch(setServiceUnavailable('Error hydrating emails.'))
    }
  }

export const updateEmailLabel = (
  props: UpdateRequestParamsSingle
): AppThunk => {
  const {
    messageId,
    request,
    request: { removeLabelIds },
    labelIds,
  } = props

  return async (dispatch, getState) => {
    try {
      const { emailList, searchList, coreStatus } = getState().email
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
        if (
          getState().router.location?.pathname.includes('/mail/') &&
          !getState().labels.labelIds.includes(global.DRAFT_LABEL)
        ) {
          // The push route method should only work when the action is Archive, ToDo or Delete via Detail actions.
          if (
            (request?.removeLabelIds &&
              !request?.removeLabelIds.includes(global.UNREAD_LABEL)) ||
            request?.delete
          ) {
            const { viewIndex, sessionViewIndex } = getState().emailDetail

            const nextID = () =>
              staticActiveEmailList.threads[viewIndex + 1] !== undefined
                ? staticActiveEmailList.threads[viewIndex + 1].id
                : null

            const staticNextID = nextID()
            const staticLabelURL = labelURL(labelIds)
            if (coreStatus && staticNextID) {
              dispatch(setCurrentEmail(staticNextID))
              dispatch(setSessionViewIndex(sessionViewIndex + 1))
              dispatch(push(`/mail/${staticLabelURL}/${staticNextID}/messages`))
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
            if (!coreStatus || (coreStatus && !staticNextID)) {
              dispatch(navigateBack())
            }
          }
        }

        if (!request.delete) {
          try {
            await messageApi().updateMessage({ messageId, request })
          } catch (err) {
            dispatch(setServiceUnavailable('Error updating label.'))
          }
        }
        if (request.delete) {
          try {
            await messageApi().thrashMessage({ messageId })
          } catch (err) {
            dispatch(setServiceUnavailable('Error updating label.'))
          }
        }
        if (
          (removeLabelIds && !removeLabelIds.includes(global.UNREAD_LABEL)) ||
          request.delete
        ) {
          dispatch(
            listRemoveItemDetail({
              messageId,
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
              messageApi().updateMessage({
                messageId: selectedEmails[i],
                request,
              })
            } catch (err) {
              dispatch(setServiceUnavailable('Error updating label.'))
            }
          }
          if (request.delete) {
            try {
              messageApi().thrashMessage({ messageId: selectedEmails[i] })
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

// Use profile history id, compare this to the received history id. If the received history id is higher than stored version. Refetch the email list for inbox only.
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

        // Skip the feed, if the feed hasn't loaded yet.
        for (let i = 0; i < sortedFeeds.length; i += 1) {
          for (let j = 0; j < loadedInbox.length; j += 1) {
            if (sortedFeeds[i].labels.includes(loadedInbox[j][0])) {
              dispatch(loadEmailDetails(sortedFeeds[i]))
            }
          }
        }
      }
      const { data } = await userApi().fetchUser()
      dispatch(setProfile(data))
      handleSessionStorage(global.LAST_REFRESH, Date.now().toString())
    } else {
      dispatch(setServiceUnavailable('Cannot refresh feed'))
    }
  } catch (err) {
    dispatch(setServiceUnavailable('Cannot refresh feed'))
  } finally {
    dispatch(setIsFetching(false))
  }
}

export const resetValuesEmailDetail =
  (): AppThunk => async (dispatch, getState) => {
    const { currEmail, currMessage, viewIndex, sessionViewIndex } =
      getState().emailDetail
    const { coreStatus } = getState().email
    if (currEmail.length > 0) {
      dispatch(setCurrentEmail(''))
    }
    if (currMessage.length > 0) {
      dispatch(setCurrentMessage(''))
    }
    if (viewIndex > -1) {
      dispatch(setViewIndex(-1))
    }
    if (sessionViewIndex > -1) {
      dispatch(setSessionViewIndex(-1))
    }
    if (coreStatus) {
      dispatch(setCoreStatus(null))
    }
  }

export const selectIsFetching = (state: RootState) => state.email.isFetching
export const selectCoreStatus = (state: RootState) => state.email.coreStatus
export const selectActiveEmailListIndex = (state: RootState) =>
  state.email.activeEmailListIndex
export const selectEmailList = (state: RootState) => state.email.emailList
export const selectSearchList = (state: RootState) => state.email.searchList
export const selectNextPageToken = (state: RootState) =>
  state.email.emailList[0].nextPageToken
export const selectSelectedEmails = (state: RootState) =>
  state.email.selectedEmails

export default emailListSlice.reducer
