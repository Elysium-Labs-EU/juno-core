/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import threadApi from '../data/threadApi'
import {
  setIsLoading,
  setIsSilentLoading,
  setServiceUnavailable,
} from './utilsSlice'
import { setLoadedInbox } from './labelsSlice'
import { loadEmailDetails, UpdateEmailListLabel } from './emailListSlice'
import { FilteredMetaList } from '../utils'
import userApi from '../data/userApi'
import { setProfile } from './baseSlice'
import type { AppThunk, RootState } from './store'
import { UpdateRequestParams } from './metaEmailListTypes'
import {
  LoadEmailObject,
  MetaListObject,
  MetaListThreadItem,
  MetaListState,
} from './metaListTypes'

const initialState: MetaListState = Object.freeze({
  metaList: [],
  isFetching: false,
})

export const metaListSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    listAddMeta: (state, action) => {
      // Find metaList sub-array index
      const arrayIndex: number = state.metaList
        .map((metaArray) => metaArray.labels)
        .flat(1)
        .findIndex((obj) => obj.includes(action.payload.labels))

      // If metaList sub-array index exists, add to or update the existing array
      if (arrayIndex > -1) {
        // It loops through all the newly fetched threads, and if check what to do with this. Either push it to the tempArray, or update the entry in the metaList state.
        const tempArray: any = []
        let activeCount: number = 0
        const completeCount: number = action.payload.threads.length - 1

        action.payload.threads.forEach((thread: MetaListThreadItem) => {
          const objectIndex: number = state.metaList[
            arrayIndex
          ].threads.findIndex((item) => item.id === thread.id)

          if (objectIndex === -1) {
            activeCount += 1
            tempArray.push(thread)
          }

          if (objectIndex > -1) {
            activeCount += 1
            const currentState = state.metaList
            currentState[arrayIndex].threads[objectIndex] = thread
            currentState[arrayIndex].threads.sort(
              (a, b) => parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
            )
            state.metaList = currentState
          }

          if (activeCount === completeCount) {
            const currentState = state.metaList
            const concatNewMetaThreads = currentState[arrayIndex].threads
              .concat(tempArray)
              .sort(
                (a, b) => parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
              )
            const newObject: MetaListObject = {
              ...action.payload,
              threads: concatNewMetaThreads,
            }
            currentState[arrayIndex] = newObject
            state.metaList = currentState
          }

          return null
        })
      } else {
        const sortedMetaList: MetaListObject = {
          ...action.payload,
          threads: action.payload.threads.sort(
            (a: MetaListThreadItem, b: MetaListThreadItem) =>
              parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
          ),
        }
        state.metaList.push(sortedMetaList)
      }
    },
    listAddItemMeta: (state, action) => {
      const {
        filteredTargetMetaList,
        activeMetaObjArray,
      }: {
        filteredTargetMetaList: MetaListObject[]
        activeMetaObjArray: MetaListThreadItem[]
      } = action.payload
      const objectIndex: number = filteredTargetMetaList[0].threads.findIndex(
        (item) => item.id === activeMetaObjArray[0].id
      )
      // If the object doesn't exist yet on the array, add it - otherwise do nothing since the item already exists.
      if (objectIndex === -1) {
        const newMetaListEntry = {
          ...filteredTargetMetaList[0],
          threads: filteredTargetMetaList[0].threads
            .concat(activeMetaObjArray)
            .sort(
              (a: MetaListThreadItem, b: MetaListThreadItem) =>
                parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
            ),
        }
        const updatedMetaList = [
          ...state.metaList.filter(
            (threadList) =>
              !threadList.labels.includes(filteredTargetMetaList[0].labels[0])
          ),
          newMetaListEntry,
        ]
        state.metaList = updatedMetaList
      }
    },
    listRemoveItemMeta: (state, action) => {
      const { filteredCurrentMetaList, messageId } = action.payload
      const newMetaListEntry = {
        ...filteredCurrentMetaList[0],
        threads: filteredCurrentMetaList[0].threads.filter(
          (item: MetaListThreadItem) => item.id !== messageId
        ),
      }
      const updatedMetaList = [
        ...state.metaList.filter(
          (threadList) =>
            !threadList.labels.includes(filteredCurrentMetaList[0].labels[0])
        ),
        newMetaListEntry,
      ]
      state.metaList = updatedMetaList
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload
    },
  },
})

export const {
  listAddMeta,
  listAddItemMeta,
  listRemoveItemMeta,
  setIsFetching,
} = metaListSlice.actions

export const loadEmails =
  (params: LoadEmailObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { labelIds, silentLoading, activeMetaObjArray } = params
      if (!silentLoading && !getState().utils.isLoading) {
        dispatch(setIsLoading(true))
      }
      if (silentLoading && !getState().utils.isSilentLoading) {
        dispatch(setIsSilentLoading(true))
      }
      const metaList = await threadApi().getThreads(params)
      if (metaList) {
        if (metaList.message.resultSizeEstimate > 0) {
          const { threads, nextPageToken } = metaList.message

          // If there is a specific email array being sent as parameter, append that to the list of threads.
          const labeledThreads = {
            labels: labelIds,
            threads: activeMetaObjArray
              ? threads.concat(activeMetaObjArray)
              : threads,
            nextPageToken: nextPageToken ?? null,
          }
          dispatch(listAddMeta(labeledThreads))
          dispatch(loadEmailDetails(labeledThreads))
        } else {
          dispatch(setLoadedInbox(labelIds))
          dispatch(setIsLoading(false))
          getState().utils.isSilentLoading &&
            dispatch(setIsSilentLoading(false))
        }
      } else {
        dispatch(setServiceUnavailable('No feed found'))
        dispatch(setIsLoading(false))
        getState().utils.isSilentLoading && dispatch(setIsSilentLoading(false))
      }
    } catch (err) {
      console.log(err)
      dispatch(setIsLoading(false))
      getState().utils.isSilentLoading && dispatch(setIsSilentLoading(false))
      dispatch(
        setServiceUnavailable('Something went wrong whilst loading Meta data.')
      )
    }
  }

export const UpdateMetaListLabel = (props: UpdateRequestParams): AppThunk => {
  const {
    messageId,
    request,
    request: { addLabelIds, removeLabelIds },
    location,
    labelIds,
  } = props

  return async (dispatch, getState) => {
    try {
      const { metaList } = getState().meta
      const filteredCurrentMetaList =
        metaList && (removeLabelIds || request.delete) && removeLabelIds
          ? FilteredMetaList({ metaList, labelIds: removeLabelIds })
          : FilteredMetaList({ metaList, labelIds })

      const filteredTargetMetaList =
        metaList &&
        addLabelIds &&
        FilteredMetaList({ metaList, labelIds: addLabelIds })

      const activeMetaObjArray =
        filteredCurrentMetaList &&
        filteredCurrentMetaList[0].threads.filter(
          (item: MetaListThreadItem) => item.id === messageId
        )

      // Fetches the target meta list if it doesn't exist yet. And injects the activeMetaObjArray
      if (
        filteredTargetMetaList &&
        filteredTargetMetaList.length < 1 &&
        activeMetaObjArray &&
        activeMetaObjArray.length > 0
      ) {
        const silentLoading = true
        const params = {
          labelIds: addLabelIds,
          maxResults: 20,
          silentLoading,
          activeMetaObjArray,
        }
        dispatch(loadEmails(params))
      }

      if (
        addLabelIds &&
        filteredTargetMetaList &&
        filteredTargetMetaList.length > 0
      ) {
        dispatch(
          listAddItemMeta({
            activeMetaObjArray,
            filteredTargetMetaList,
          })
        )
      }
      if (removeLabelIds || request.delete) {
        dispatch(
          listRemoveItemMeta({
            messageId,
            filteredCurrentMetaList,
          })
        )
      }
      dispatch(
        UpdateEmailListLabel({
          request,
          messageId,
          labelIds,
          location,
        })
      )
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error updating label.'))
    }
    return null
  }
}

// Use profile history id, compare this to the received history id. If the history id is higher than stored version. Refetch the meta list for inbox only first.
export const refreshEmailFeed =
  (params: LoadEmailObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setIsFetching(true))
      const savedHistoryId = parseInt(getState().base.profile.historyId, 10)
      const checkFeed = await threadApi().getThreads(params)
      const newEmailsIdx = checkFeed.message.threads.findIndex(
        (thread: MetaListThreadItem) =>
          parseInt(thread.historyId, 10) < savedHistoryId
      )
      if (newEmailsIdx > -1) {
        const newSlice = checkFeed.message.threads.slice(0, newEmailsIdx)
        if (newSlice.length > 0) {
          const user = await userApi().fetchUser()
          dispatch(setProfile(user?.data.data))
          const labeledThreads = {
            labels: params.labelIds,
            threads: newSlice,
            nextPageToken: checkFeed.message.nextPageToken ?? null,
          }
          dispatch(listAddMeta(labeledThreads))
          dispatch(loadEmailDetails(labeledThreads))
        }
      }
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Cannot refresh feed'))
    } finally {
      dispatch(setIsFetching(false))
    }
  }

export const selectIsFetching = (state: RootState) => state.meta.isFetching

export default metaListSlice.reducer
