/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'
import createApiClient from '../data/api'
import { setIsLoading, setServiceUnavailable } from './utilsSlice'
import { setBaseLoaded } from './baseSlice'
import { setLoadedInbox } from './labelsSlice'
import { loadEmailDetails } from './emailListSlice'

const api = createApiClient()

export const metaListSlice = createSlice({
  name: 'meta',
  initialState: {
    metaList: [],
  },
  reducers: {
    listAddMeta: (state, action) => {
      const sortedMetaList = {
        ...action.payload,
        threads: action.payload.threads.sort((a, b) => {
          return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
        }),
      }

      const arrayIndex = state.metaList
        .map((metaArray) => metaArray.labels)
        .flat(1)
        .findIndex((obj) => obj.includes(action.payload.labels))
      if (arrayIndex > -1) {
        const newArray = state.metaList[arrayIndex].threads
          .concat(sortedMetaList.threads)
          .sort((a, b) => {
            return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
          })
        const newObject = { ...action.payload, threads: newArray }
        const currentState = state.metaList
        currentState[arrayIndex] = newObject
        state.metaList = currentState
        // return {
        //   ...state,
        //   metaList: [...currentState],
        // }
      } else {
        state.metaList = [...state.metaList, sortedMetaList]
      }
      //   return {
      //     ...state,
      //     metaList: [...state.metaList, sortedMetaList],
      //   }
    },
    listAddItemMeta: (state, action) => {
      const { filteredTargetMetaList, activeMetaObjArray } = action.payload
      const newMetaListEntry = {
        ...filteredTargetMetaList[0],
        threads: filteredTargetMetaList[0].threads
          .concat(activeMetaObjArray)
          .sort((a, b) => {
            return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
          }),
      }
      const updatedMetaList = [
        ...state.metaList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredTargetMetaList[0].labels)
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
          (item) => item.id !== messageId
        ),
      }
      const updatedMetaList = [
        ...state.metaList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredCurrentMetaList[0].labels)
        ),
        newMetaListEntry,
      ]
      state.metaList = updatedMetaList
    },
  },
})

export const { listAddMeta, listAddItemMeta, listRemoveItemMeta } =
  metaListSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const loadEmails = (params) => {
  console.log(params)
  return async (dispatch, getState) => {
    try {
      if (!getState().isLoading) {
        dispatch(setIsLoading(true))
      }
      const { labelIds } = params
      const metaList = await api.getThreads(params)
      if (metaList) {
        if (metaList.message.resultSizeEstimate > 0) {
          console.log(metaList.message)
          const { threads, nextPageToken } = metaList.message
          const labeledThreads = {
            labels: labelIds,
            threads,
            nextPageToken: nextPageToken ?? null,
          }
          await dispatch(listAddMeta(labeledThreads))
          dispatch(loadEmailDetails(labeledThreads))
        } else {
          if (getState().baseLoaded) {
            dispatch(setServiceUnavailable('No feed found'))
          }
          dispatch(setLoadedInbox(labelIds))
          console.log(`Empty Inbox for ${labelIds}`)
          if (
            !getState().baseLoaded &&
            getState().storageLabels.length === getState().loadedInbox.length
          ) {
            dispatch(setIsLoading(false))
            dispatch(setBaseLoaded(true))
          }
        }
      } else {
        dispatch(setServiceUnavailable('No feed found'))
        dispatch(setIsLoading(false))
      }
    } catch (err) {
      console.log(err)
      dispatch(setIsLoading(false))
      dispatch(
        dispatch(
          setServiceUnavailable(
            'Something went wrong whilst loading Meta data.'
          )
        )
      )
    }
  }
}

// Use a checkfeed of 100 items, compare this to the current MetaList, if the checkFeeds newest item
// is newer than the metaList, cut off the items from the checkfeed which are older than the newest metaList item
export const refreshEmailFeed = (params, metaList) => {
  return async (dispatch) => {
    console.log('WIP need to change listUpdateMeta function')
    console.log(params, metaList, dispatch)
    // const checkFeed = await api.getThreads(params)
    // if (checkFeed.message.threads[0].historyId > metaList[0].historyId) {
    //   const newThreads = checkFeed.message.threads.filter(
    //     (thread) => thread.historyId > metaList[0].historyId
    //   )
    //   const newThreadsObject = { message: { threads: [...newThreads] } }
    //   dispatch(listUpdateMeta(newThreads))
    //   dispatch(loadEmailDetails(newThreadsObject))
    // } else {
    //   console.log('No new messages')
    // }
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectDraft = (state) => state.draftList

export default metaListSlice.reducer
