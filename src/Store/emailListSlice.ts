/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'
import threadApi from '../data/threadApi'
import {
  setIsLoading,
  setIsSilentLoading,
  setServiceUnavailable,
} from './utilsSlice'
import { setCurrentLabels, setLoadedInbox } from './labelsSlice'
import messageApi from '../data/messageApi'
import * as draft from '../constants/draftConstants'
import * as global from '../constants/globalConstants'
import RouteConstants from '../constants/routes.json'
import type { AppThunk, RootState } from './store'
import {
  IEmailListThreadItem,
  IEmailListObject,
  IEmailListState,
  IEmailListObjectSearch,
} from './emailListTypes'
import {
  LoadEmailObject,
  MetaListThreadItem,
  UpdateRequestParams,
} from './metaEmailListTypes'
import sortThreads from '../utils/sortThreads'
import undoubleThreads from '../utils/undoubleThreads'
import {
  setCurrentEmail,
  setCurrentMessage,
  setSessionViewIndex,
  setViewIndex,
} from './emailDetailSlice'
import userApi from '../data/userApi'
import { setProfile } from './baseSlice'
import labelURL from '../utils/createLabelURL'
import navigateBack from '../utils/navigateBack'
import { edgeLoadingNextPage } from '../utils/loadNextPage'

const initialState: IEmailListState = Object.freeze({
  emailList: [],
  searchList: null,
  activeEmailListIndex: -1,
  coreStatus: null,
  isFetching: false,
})

export const emailListSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setCoreStatus: (state, action) => {
      state.coreStatus = action.payload
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload
    },
    setActiveEmailListIndex: (state, action) => {
      state.activeEmailListIndex = action.payload
    },
    listAddEmailList: (state, action) => {
      if (action.payload.labels) {
        // Find emailList sub-array index
        const arrayIndex: number = state.emailList
          .map((emailArray) => emailArray.labels)
          .flat(1)
          .findIndex((obj) =>
            obj ? obj.includes(action.payload.labels) : null
          )
        // If emailList sub-array index exists, if exists concat threads.
        // If not, push the new emailList
        if (arrayIndex > -1) {
          // It loops through all the newly fetched threads, and if check what to do with this.
          // Either push it to the tempArray, or update the entry in the emailList state.
          const tempArray: any = []
          let activeCount: number = 0
          const completeCount: number = action.payload.threads.length

          for (let i = 0; i < completeCount; i += 1) {
            // Check if the object already exists on the Redux store.
            const objectIndex = state.emailList[arrayIndex].threads.findIndex(
              (item) => item.id === action.payload.threads[i].id
            )

            if (objectIndex === -1) {
              activeCount += 1
              tempArray.push(action.payload.threads[i])
            }

            if (objectIndex > -1) {
              activeCount += 1
              const currentState = state.emailList
              currentState[arrayIndex].threads[objectIndex] =
                action.payload.threads[i]
              state.emailList = currentState
            }

            if (activeCount === completeCount) {
              const currentState = state.emailList
              const sortedThreads = sortThreads(
                currentState[arrayIndex].threads.concat(tempArray)
              )

              const newObject: IEmailListObject = {
                labels: action.payload.labels,
                threads: undoubleThreads(sortedThreads),
                nextPageToken: action.payload.nextPageToken ?? null,
              }
              currentState[arrayIndex] = newObject
              state.emailList = currentState
            }
          }
        }
        if (arrayIndex === -1) {
          const sortedThreads = sortThreads(action.payload.threads)

          const sortedEmailList: IEmailListObject = {
            ...action.payload,
            threads: undoubleThreads(sortedThreads),
          }
          state.emailList.push(sortedEmailList)
        }
      }
    },
    listAddItemDetail: (state, action) => {
      const {
        staticIndexTargetEmailList,
        activeEmailObjArray,
      }: {
        staticIndexTargetEmailList: number
        activeEmailObjArray: IEmailListThreadItem[]
      } = action.payload
      const objectIndex: number = state.emailList[
        staticIndexTargetEmailList
      ].threads.findIndex((item) => item.id === activeEmailObjArray[0].id)
      // If the object doesn't exist yet on the array, add it - otherwise do nothing since the item already exists.
      if (objectIndex === -1) {
        const newEmailListEntry: IEmailListObject = {
          ...state.emailList[staticIndexTargetEmailList],
          threads: sortThreads(
            state.emailList[staticIndexTargetEmailList].threads.concat(
              activeEmailObjArray
            )
          ),
        }

        const updatedEmailList: IEmailListObject[] = [
          ...state.emailList.filter(
            (threadList) =>
              !threadList.labels.includes(
                state.emailList[staticIndexTargetEmailList].labels[0]
              )
          ),
          newEmailListEntry,
        ]
        state.emailList = updatedEmailList
      }
    },
    listRemoveItemDetail: (state, action) => {
      const {
        messageId,
      }: {
        messageId: string
      } = action.payload
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
    listUpdateItemDetail: (state, action) => {
      const { responseEmail }: { responseEmail: any } = action.payload

      if (
        state.emailList[state.activeEmailListIndex] &&
        responseEmail &&
        Object.keys(responseEmail).length > 0
      ) {
        const updatedEmailList = (): IEmailListObject[] => {
          // Need to loop through the existing emailObject and replace the labelIds on each message.
          // The emailObject will be filtered from the old list, and the new object will be added.
          // Redux Immutability is not allowing a direct modification.

          const objectIndex = state.emailList[
            state.activeEmailListIndex
          ].threads.findIndex((thread) => thread.id === responseEmail.id)

          // ObjectIndex will be -1 if the Redux has already removed the item, but the user is still in emailDetail.
          if (objectIndex > -1) {
            const updateEmailListObject = (): IEmailListObject => {
              const updatedThreadMessages = (): any =>
                state.emailList[state.activeEmailListIndex].threads[
                  objectIndex
                ].messages?.map((message) => {
                  const convertedObjectToArray = Object.entries(message)
                  const attributeIndex = convertedObjectToArray.findIndex(
                    (item) => item[0] === 'labelIds'
                  )

                  convertedObjectToArray[attributeIndex][1] =
                    responseEmail.messages[0].labelIds

                  return Object.fromEntries(convertedObjectToArray)
                })

              const filteredCurrentEmailList = {
                ...state.emailList[state.activeEmailListIndex],
                threads: state.emailList[
                  state.activeEmailListIndex
                ].threads.filter((thread) => thread.id !== responseEmail.id),
              }

              const newThreadObject = {
                ...state.emailList[state.activeEmailListIndex].threads[
                  objectIndex
                ],
                messages: updatedThreadMessages(),
              }

              const newIEmailListObject = {
                ...filteredCurrentEmailList,
                threads: sortThreads(
                  filteredCurrentEmailList.threads.concat(newThreadObject)
                ),
              }

              return newIEmailListObject
            }

            const emailStateWithoutActiveEmailListObject = [
              ...state.emailList.filter(
                (threadList) =>
                  !threadList.labels.includes(
                    state.emailList[state.activeEmailListIndex].labels[0]
                  )
              ),
            ]

            return emailStateWithoutActiveEmailListObject.length > 0
              ? [
                  ...emailStateWithoutActiveEmailListObject,
                  updateEmailListObject(),
                ]
              : Array(updateEmailListObject())
          }
          return []
        }
        const staticUpdatedEmailList = updatedEmailList()
        if (staticUpdatedEmailList.length > 0)
          state.emailList = staticUpdatedEmailList
      }
    },
    listUpdateSearchResults: (state, action) => {
      state.searchList = action.payload
    },
  },
})

export const {
  setCoreStatus,
  setIsFetching,
  setActiveEmailListIndex,
  listAddEmailList,
  listAddItemDetail,
  listRemoveItemDetail,
  listUpdateItemDetail,
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
  }

export const loadEmailDetails =
  (labeledThreads: IEmailListObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { threads, labels, nextPageToken } = labeledThreads
      if (threads) {
        const buffer: any = []

        if (threads.length > 0) {
          for (const thread of threads) {
            buffer.push(threadApi().getThreadDetail(thread.id))
          }
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
      console.error(err)
      dispatch(setServiceUnavailable('Error hydrating emails.'))
    }
  }

export const loadEmails =
  (params: LoadEmailObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { labelIds, silentLoading, nextPageToken, maxResults, q } = params
      if (!silentLoading && !getState().utils.isLoading) {
        dispatch(setIsLoading(true))
      }
      if (silentLoading && !getState().utils.isSilentLoading) {
        dispatch(setIsSilentLoading(true))
      }
      const response = await threadApi().getFullThreads({
        q,
        labelIds,
        maxResults: maxResults ?? 20,
        nextPageToken,
      })
      if (response && response.resultSizeEstimate > 0) {
        if (!q) {
          dispatch(
            listAddEmailList({
              labels: labelIds,
              threads: response.threads,
              nextPageToken: response.nextPageToken,
            })
          )
          dispatch(setLoadedInbox(labelIds))
        }
        if (q) {
          dispatch(
            storeSearchResults({
              q,
              threads: response.threads,
              nextPageToken: response.nextPageToken,
            })
          )
        }
        getState().utils.isLoading && dispatch(setIsLoading(false))
        getState().utils.isSilentLoading && dispatch(setIsSilentLoading(false))
      } else {
        dispatch(setLoadedInbox(labelIds))
        getState().utils.isLoading && dispatch(setIsLoading(false))
        getState().utils.isSilentLoading && dispatch(setIsSilentLoading(false))
      }
    } catch (err) {
      console.error(err)
      getState().utils.isLoading && dispatch(setIsLoading(false))
      getState().utils.isSilentLoading && dispatch(setIsSilentLoading(false))
      dispatch(
        setServiceUnavailable('Something went wrong whilst loading data.')
      )
    }
  }

export const updateEmailLabel = (props: UpdateRequestParams): AppThunk => {
  const {
    messageId,
    request,
    request: { addLabelIds, removeLabelIds },
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
          !getState().labels.labelIds.includes(draft.DRAFT_LABEL)
        ) {
          // The push route method should only work when the action is Archive, ToDo or Delete via Detail actions.
          if (
            (request &&
              request.removeLabelIds &&
              !request.removeLabelIds.includes(global.UNREAD_LABEL)) ||
            request.delete
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
            if (coreStatus && !staticNextID) {
              const { composeEmail } = getState().compose
              navigateBack({ coreStatus, composeEmail, dispatch })
            }
            if (!coreStatus) {
              if (labelIds.includes(global.INBOX_LABEL)) {
                dispatch(push(RouteConstants.INBOX))
              } else {
                dispatch(push(RouteConstants.HOME))
              }
            }
          }
        }

        if (!request.delete) {
          messageApi().updateMessage({ messageId, request })
        }
        if (request.delete) {
          messageApi().thrashMessage({ messageId })
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
      // }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error updating label.'))
    }
  }
}

// Use profile history id, compare this to the received history id. If the received history id is higher than stored version. Refetch the email list for inbox only.
export const refreshEmailFeed =
  (params: LoadEmailObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsFetching(true))
      const savedHistoryId = parseInt(getState().base.profile.historyId, 10)
      const response = await threadApi().getThreads(params)
      const { threads, nextPageToken } = response
      const newEmailsIdx = threads?.findIndex(
        (thread: MetaListThreadItem) =>
          parseInt(thread.historyId, 10) < savedHistoryId
      )
      const { labelIds } = params
      const user = await userApi().fetchUser()
      if (user.data) {
        dispatch(setProfile(user.data))
      }
      if (newEmailsIdx > -1) {
        const newSlice = threads.slice(0, newEmailsIdx)
        if (newSlice.length > 0) {
          const labeledThreads = {
            labels: labelIds,
            threads: newSlice,
            nextPageToken,
          }
          dispatch(loadEmailDetails(labeledThreads))
        }
      } else {
        // Attempt a fresh feed fetch when the inbox is empty.
        const { emailFetchSize } = getState().utils
        const freshInboxParams = {
          labelIds,
          maxResults: emailFetchSize,
          nextPageToken: null,
        }
        dispatch(loadEmails(freshInboxParams))
      }
    } catch (err) {
      console.error(err)
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
export const selectNextPageToken = (state: any) =>
  state.email.emailList.nextPageToken

export default emailListSlice.reducer
