/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import createApiClient from '../data/api'
import { setIsLoading, setServiceUnavailable } from './utilsSlice'
import { setLoadedInbox } from './labelsSlice'
import { loadEmailDetails, UpdateEmailListLabel } from './emailListSlice'
import { FilteredMetaList, NavigateNextMail } from '../utils'

const api = createApiClient()
const DRAFT = 'DRAFT'

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
        state.metaList.push(sortedMetaList)
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

export const loadEmails = (params) => {
  return async (dispatch, getState) => {
    try {
      if (!getState().utils.isLoading) {
        dispatch(setIsLoading(true))
      }
      const { labelIds } = params
      const metaList = await api.getThreads(params)
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
        dispatch(
          setServiceUnavailable(
            'Something went wrong whilst loading Meta data.'
          )
        )
      )
    }
  }
}

export const UpdateMetaListLabel = (props) => {
  const {
    messageId,
    request,
    request: { addLabelIds, removeLabelIds },
    history,
    labelURL,
  } = props

  return async (dispatch, getState) => {
    try {
      const { metaList } = getState().meta
      const filteredCurrentMetaList =
        metaList &&
        removeLabelIds &&
        FilteredMetaList({ metaList, labelIds: removeLabelIds })
      const filteredTargetMetaList =
        metaList &&
        addLabelIds &&
        FilteredMetaList({ metaList, labelIds: addLabelIds })
      return axios
        .patch(`/api/message/${messageId}`, request)
        .then((res) => {
          if (res.status === 200) {
            if (addLabelIds) {
              const activeMetaObjArray =
                filteredCurrentMetaList[0].threads.filter(
                  (item) => item.id === messageId
                )
              dispatch(
                listAddItemMeta({
                  activeMetaObjArray,
                  filteredTargetMetaList,
                })
              )
            }
            if (removeLabelIds) {
              dispatch(
                listRemoveItemMeta({
                  messageId,
                  filteredCurrentMetaList,
                })
              )
            }
            dispatch(UpdateEmailListLabel(props))
            if (
              getState().emailDetail.currEmail &&
              !getState().labels.labelIds.includes(DRAFT)
            ) {
              const { viewIndex } = getState().emailDetail
              NavigateNextMail({
                history,
                labelURL,
                filteredCurrentMetaList,
                viewIndex,
              })
            }
          } else {
            dispatch(setServiceUnavailable('Error updating label.'))
          }
        })
        .catch((err) => console.log(err))
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error updating label.'))
    }
    return null
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
export const selectMetaList = (state) => state.meta.metaList

export default metaListSlice.reducer
