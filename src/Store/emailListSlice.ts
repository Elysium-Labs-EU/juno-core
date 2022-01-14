/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { push } from 'redux-first-history'
import isEmpty from 'lodash/isEmpty'
import threadApi from '../data/threadApi'
import {
  setIsLoading,
  setIsSilentLoading,
  setServiceUnavailable,
} from './utilsSlice'
import { setLoadedInbox } from './labelsSlice'
import emailListFilteredByLabel from '../utils/emailListFilteredByLabel'
import messageApi from '../data/messageApi'
import * as draft from '../constants/draftConstants'
import * as global from '../constants/globalConstants'
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
import { setCurrentEmail, setViewIndex } from './emailDetailSlice'
import userApi from '../data/userApi'
import { setProfile } from './baseSlice'
import labelURL from '../utils/createLabelURL'

const initialState: IEmailListState = Object.freeze({
  emailList: [],
  searchList: null,
  isFocused: false,
  isSorting: false,
  isFetching: false,
})

export const emailListSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setIsFocused: (state, action) => {
      state.isFocused = action.payload
    },
    setIsSorting: (state, action) => {
      state.isSorting = action.payload
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload
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

          for (let i = 0; i < action.payload.threads.length; i += 1) {
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
                nextPageToken:
                  action.payload.nextPageToken ??
                  currentState[arrayIndex].nextPageToken,
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
        staticIndexActiveEmailList,
        messageId,
      }: {
        staticIndexActiveEmailList: number
        messageId: string
      } = action.payload
      const newEmailListEntry: IEmailListObject = {
        ...state.emailList[staticIndexActiveEmailList],
        threads: state.emailList[staticIndexActiveEmailList].threads.filter(
          (item: IEmailListThreadItem) => item.id !== messageId
        ),
      }
      const updatedEmailList: IEmailListObject[] = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(
              state.emailList[staticIndexActiveEmailList].labels[0]
            )
        ),
        newEmailListEntry,
      ]
      state.emailList = updatedEmailList
    },
    listUpdateItemDetail: (state, action) => {
      const {
        staticIndexActiveEmailList,
        responseEmail,
      }: { staticIndexActiveEmailList: number; responseEmail: any } =
        action.payload

      console.log(action.payload)

      if (responseEmail && Object.keys(responseEmail).length > 0) {
        const updatedEmailList = (): IEmailListObject | IEmailListObject[] => {
          // Need to loop through the existing emailObject and replace the labelIds on each message.
          // The emailObject will be filtered from the old list, and the new object will be added.
          // Redux Immutability is not allowing a direct modification.

          const objectIndex = (): number => {
            if (staticIndexActiveEmailList > -1) {
              return state.emailList[
                staticIndexActiveEmailList
              ].threads.findIndex(
                (thread) => thread.id === responseEmail.message.id
              )
            }
            if (state.searchList) {
              return state.searchList.threads.findIndex(
                (thread) => thread.id === responseEmail.message.id
              )
            }
            return -1
          }

          const staticObjectIndex = objectIndex()
          console.log(staticObjectIndex)
          console.log(responseEmail)

          // ObjectIndex will be -1 if the Redux has already removed the item, but the user is still in emailDetail.
          if (staticObjectIndex > -1) {
            const updateEmailListObject = (): IEmailListObject => {
              const updatedThreadMessages = (): any => {
                if (staticIndexActiveEmailList > -1) {
                  return state.emailList[staticIndexActiveEmailList].threads[
                    staticObjectIndex
                  ].messages?.map((message) => {
                    const convertedObjectToArray = Object.entries(message)
                    const attributeIndex = convertedObjectToArray.findIndex(
                      (item) => item[0] === 'labelIds'
                    )

                    convertedObjectToArray[attributeIndex][1] =
                      responseEmail.message.messages[0].labelIds

                    return Object.fromEntries(convertedObjectToArray)
                  })
                }
                if (state.searchList) {
                  console.log(state.searchList.threads[staticObjectIndex])
                  return state.searchList.threads[
                    staticObjectIndex
                  ].messages?.map((message) => {
                    const convertedObjectToArray = Object.entries(message)
                    const attributeIndex = convertedObjectToArray.findIndex(
                      (item) => item[0] === 'labelIds'
                    )
                    if (responseEmail.message.messages[0].labelIds)
                      convertedObjectToArray[attributeIndex][1] =
                        responseEmail.message.messages[0].labelIds
                    console.log(Object.fromEntries(convertedObjectToArray))
                    return Object.fromEntries(convertedObjectToArray)
                  })
                }
                return []
              }

              const filteredCurrentEmailList =
                staticIndexActiveEmailList === -1 && state.searchList
                  ? {
                      ...state.searchList,
                      threads: state.searchList.threads.filter(
                        (thread) => thread.id !== responseEmail.message.id
                      ),
                    }
                  : {
                      ...state.emailList[staticIndexActiveEmailList],
                      threads: state.emailList[
                        staticIndexActiveEmailList
                      ].threads.filter(
                        (thread) => thread.id !== responseEmail.message.id
                      ),
                    }

              const newThreadObject =
                staticIndexActiveEmailList === -1 && state.searchList
                  ? {
                      ...state.searchList.threads[staticObjectIndex],
                      messages: updatedThreadMessages(),
                    }
                  : {
                      ...state.emailList[staticIndexActiveEmailList].threads[
                        staticObjectIndex
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

            // There is only 1 searchList, we can use an empty one to fill it again.
            const emailStateWithoutActiveEmailListObject =
              staticIndexActiveEmailList === -1 && state.searchList
                ? []
                : [
                    ...state.emailList.filter(
                      (threadList) =>
                        !threadList.labels.includes(
                          state.emailList[staticIndexActiveEmailList].labels[0]
                        )
                    ),
                  ]

            if (staticIndexActiveEmailList === -1 && state.searchList) {
              return updateEmailListObject()
            }
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
        if (!isEmpty(staticUpdatedEmailList))
          if (
            staticIndexActiveEmailList === -1 &&
            state.searchList &&
            !Array.isArray(staticUpdatedEmailList)
          ) {
            state.searchList = staticUpdatedEmailList
            return
          }
        if (Array.isArray(staticUpdatedEmailList))
          state.emailList = staticUpdatedEmailList
      }
    },
    listUpdateSearchResults: (state, action) => {
      state.searchList = action.payload
    },
    listClearSearchResults: (state) => {
      state.searchList = null
    },
  },
})

export const {
  setIsFocused,
  setIsSorting,
  setIsFetching,
  listAddEmailList,
  listAddItemDetail,
  listRemoveItemDetail,
  listUpdateItemDetail,
  listUpdateSearchResults,
  listClearSearchResults,
} = emailListSlice.actions

// If the received object doesn't have labels of its own.
// Check per threadObject on the most recent message's labelIds to decide where to store it.
export const storeSearchResults =
  (searchThreads: IEmailListObjectSearch): AppThunk =>
  (dispatch) => {
    dispatch(listUpdateSearchResults(searchThreads))
  }

export const loadEmailDetails =
  (labeledThreads: IEmailListObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { threads, labels, nextPageToken } = labeledThreads
      if (threads) {
        const buffer: IEmailListThreadItem[] = []
        const loadCount = threads.length

        if (threads.length > 0) {
          threads.forEach(async (item) => {
            const threadDetail = await threadApi().getThreadDetail(item.id)
            buffer.push(threadDetail.thread)
            if (buffer.length === loadCount) {
              dispatch(
                listAddEmailList({
                  labels,
                  threads: buffer,
                  nextPageToken: nextPageToken ?? null,
                })
              )
              dispatch(setLoadedInbox(labels))
              getState().utils.isLoading && dispatch(setIsLoading(false))
              getState().utils.isSilentLoading &&
                dispatch(setIsSilentLoading(false))
            }
          })
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
      const { labelIds, silentLoading } = params
      if (!silentLoading && !getState().utils.isLoading) {
        dispatch(setIsLoading(true))
      }
      if (silentLoading && !getState().utils.isSilentLoading) {
        dispatch(setIsSilentLoading(true))
      }
      const metaList = await threadApi().getThreads(params)
      if (metaList.resultSizeEstimate > 0) {
        const { threads, nextPageToken } = metaList

        // If there is a specific email array being sent as parameter, append that to the list of threads.
        const labeledThreads = {
          labels: labelIds,
          threads,
          nextPageToken: nextPageToken ?? null,
        }

        dispatch(loadEmailDetails(labeledThreads))
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
      const { emailList, searchList } = getState().email

      const indexActiveEmailList = (): number => {
        if (emailList && (removeLabelIds || request.delete)) {
          if (removeLabelIds) {
            if (removeLabelIds.includes(global.UNREAD_LABEL)) {
              return emailListFilteredByLabel({
                emailList,
                labelIds,
              })
            }
            return emailListFilteredByLabel({
              emailList,
              labelIds: removeLabelIds,
            })
          }
          return emailListFilteredByLabel({ emailList, labelIds })
        }
        return -1
      }

      const indexTargetEmailList = (): number => {
        if (emailList && addLabelIds) {
          return emailListFilteredByLabel({ emailList, labelIds: addLabelIds })
        }
        return -1
      }

      const staticIndexActiveEmailList = indexActiveEmailList()
      const staticIndexTargetEmailList = indexTargetEmailList()
      const staticActiveEmailList = labelIds.includes(global.ARCHIVE_LABEL)
        ? searchList
        : emailList[staticIndexActiveEmailList]
      const staticTargetEmailList = emailList[staticIndexTargetEmailList]

      console.log(staticActiveEmailList)
      if (
        staticActiveEmailList &&
        Object.keys(staticActiveEmailList).length > 0
      ) {
        if (
          getState().router.location?.pathname.includes('/mail/') &&
          !getState().labels.labelIds.includes(draft.DRAFT_LABEL)
        ) {
          // The push route method should only work when the action is Archive, ToDo or Delete via Detail actions.
          if (request) {
            const { viewIndex } = getState().emailDetail

            const nextID = () =>
              staticActiveEmailList.threads[viewIndex + 1] !== undefined
                ? staticActiveEmailList.threads[viewIndex + 1].id
                : null

            const staticNextID = nextID()
            const staticLabelURL = labelURL(labelIds)

            if (
              (request.removeLabelIds &&
                !request.removeLabelIds.includes(global.UNREAD_LABEL)) ||
              (request.delete && staticNextID && staticLabelURL)
            ) {
              dispatch(setCurrentEmail(staticNextID))
              dispatch(setViewIndex(viewIndex + 1))
              dispatch(push(`/mail/${staticLabelURL}/${staticNextID}/messages`))
            }
          }
        }

        const response: any = !request.delete
          ? await messageApi().updateMessage({ messageId, request })
          : await messageApi().thrashMessage({ messageId })

        if (response && response.status === 200) {
          if (addLabelIds) {
            if (staticTargetEmailList) {
              const activeEmailObjArray = staticActiveEmailList.threads.filter(
                (item: IEmailListThreadItem) => item.id === messageId
              )
              dispatch(
                listAddItemDetail({
                  activeEmailObjArray,
                  staticIndexTargetEmailList,
                })
              )
            }
          }
          // NOTE: The newly added threadObject doesn't have a historyId during this process. On refetch of list it will.
          if (removeLabelIds && removeLabelIds.includes(global.UNREAD_LABEL)) {
            dispatch(
              listUpdateItemDetail({
                staticIndexActiveEmailList,
                responseEmail: response.data,
              })
            )
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
      }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Error updating label.'))
    }
    return null
  }
}

// Use profile history id, compare this to the received history id. If the received history id is higher than stored version. Refetch the email list for inbox only.
export const refreshEmailFeed =
  (params: LoadEmailObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsFetching(true))
      const savedHistoryId = parseInt(getState().base.profile.historyId, 10)
      const { threads, nextPageToken } = await threadApi().getThreads(params)
      const newEmailsIdx = threads.findIndex(
        (thread: MetaListThreadItem) =>
          parseInt(thread.historyId, 10) < savedHistoryId
      )
      if (newEmailsIdx > -1) {
        const newSlice = threads.slice(0, newEmailsIdx)
        if (newSlice.length > 0) {
          const user = await userApi().fetchUser()
          dispatch(setProfile(user?.data.data))
          const labeledThreads = {
            labels: params.labelIds,
            threads: newSlice,
            nextPageToken: nextPageToken ?? null,
          }
          dispatch(loadEmailDetails(labeledThreads))
        }
      }
    } catch (err) {
      console.error(err)
      dispatch(setServiceUnavailable('Cannot refresh feed'))
    } finally {
      dispatch(setIsFetching(false))
    }
  }

export const selectIsFocused = (state: RootState) => state.email.isFocused
export const selectIsSorting = (state: RootState) => state.email.isSorting
export const selectIsFetching = (state: RootState) => state.email.isFetching
export const selectEmailList = (state: RootState) => state.email.emailList
export const selectSearchList = (state: RootState) => state.email.searchList
export const selectNextPageToken = (state: any) =>
  state.email.emailList.nextPageToken

export default emailListSlice.reducer
