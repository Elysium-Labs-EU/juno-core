/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import threadApi from '../data/threadApi'
import { setIsLoading, setServiceUnavailable } from './utilsSlice'
import { setLoadedInbox } from './labelsSlice'
import { loadEmailDetails, UpdateEmailListLabel } from './emailListSlice'
import { FilteredMetaList } from '../utils'
import userApi from '../data/userApi'
import { setProfile } from './baseSlice'
import type { AppThunk, RootState } from './store'
import { UpdateRequestParams } from './metaEmailListSliceTypes'
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
      const sortedMetaList = {
        ...action.payload,
        threads: action.payload.threads.sort(
          (a: MetaListThreadItem, b: MetaListThreadItem) =>
            parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
        ),
      }

      // Find metaList sub-array index
      const arrayIndex = state.metaList
        .map((metaArray) => metaArray.labels)
        .flat(1)
        .findIndex((obj) => obj.includes(action.payload.labels))

      // If metaList sub-array index exists, add to the existing array
      if (arrayIndex > -1) {
        const newArray = state.metaList[arrayIndex].threads
          .concat(sortedMetaList.threads)
          .sort((a, b) => parseInt(b.historyId, 10) - parseInt(a.historyId, 10))
        const newObject = { ...action.payload, threads: newArray }
        const currentState = state.metaList
        currentState[arrayIndex] = newObject
        state.metaList = currentState
      } else {
        state.metaList.push(sortedMetaList)
      }
    },
    listAddItemMeta: (state, action) => {
      const {
        filteredTargetMetaList,
        activeMetaObjArray,
      }: {
        filteredTargetMetaList: MetaListObject[]
        activeMetaObjArray: MetaListThreadItem
      } = action.payload
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
      if (!getState().utils.isLoading) {
        dispatch(setIsLoading(true))
      }
      const { labelIds } = params
      const metaList = await threadApi().getThreads(params)
      if (metaList) {
        if (metaList.message.resultSizeEstimate > 0) {
          const { threads, nextPageToken } = metaList.message
          const labeledThreads = {
            labels: labelIds,
            threads,
            nextPageToken: nextPageToken ?? null,
          }
          dispatch(listAddMeta(labeledThreads))
          dispatch(loadEmailDetails(labeledThreads))
        } else {
          dispatch(setLoadedInbox(labelIds))
          dispatch(setIsLoading(false))
          console.log(`Empty Inbox for ${labelIds}`)
        }
      } else {
        dispatch(setServiceUnavailable('No feed found'))
        dispatch(setIsLoading(false))
      }
    } catch (err) {
      console.log(err)
      dispatch(setIsLoading(false))
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
    history,
    location,
    labelURL,
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

      // Fetches the target meta list if it doesn't exist yet.
      if (filteredTargetMetaList && filteredTargetMetaList.length < 1) {
        const params = {
          labelIds: addLabelIds,
          maxResults: 20,
        }
        dispatch(loadEmails(params))
      }
      if (addLabelIds && filteredTargetMetaList.length > 0) {
        const activeMetaObjArray = filteredCurrentMetaList[0].threads.filter(
          (item: MetaListThreadItem) => item.id === messageId
        )
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
          history,
          location,
          labelURL,
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

export const selectMetaList = (state: RootState) => state.meta.metaList
export const selectIsFetching = (state: RootState) => state.meta.isFetching

export default metaListSlice.reducer
