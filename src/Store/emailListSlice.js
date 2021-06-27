/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import createApiClient from '../data/api'
import { setIsLoading, setServiceUnavailable } from './utilsSlice'
// import { setBaseLoaded } from './baseSlice'
import { setLoadedInbox, setStorageLabels } from './labelsSlice'
import { FilteredEmailList, multipleIncludes } from '../utils'

const DRAFT = 'DRAFT'

const api = createApiClient()

export const emailListSlice = createSlice({
  name: 'email',
  initialState: {
    emailList: [],
  },
  reducers: {
    // Before listAddDetail
    listAddEmailList: (state, action) => {
      const sortedEmailList = {
        ...action.payload,
        threads: action.payload.threads.sort((a, b) => {
          return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
        }),
      }

      const arrayIndex = state.emailList
        .map((emailArray) => emailArray.labels)
        .flat(1)
        .findIndex((obj) => obj.includes(action.payload.labels))

      if (arrayIndex > -1) {
        const newArray = state.emailList[arrayIndex].threads
          .concat(sortedEmailList.threads)
          .sort((a, b) => {
            return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
          })
        const newObject = { ...action.payload, threads: newArray }
        const currentState = state.emailList
        currentState[arrayIndex] = newObject
        state.emailList = [...currentState]
        //   return {
        //   ...state,
        //   emailList: [...currentState],
        // }
      }
      state.emailList = [...state.emailList, sortedEmailList]
      //   return {
      //     ...state,
      //     emailList: [...state.emailList, sortedEmailList],
      //   }
    },
    listRemoveDetail: (state, action) => {},
    listAddItemDetail: (state, action) => {
      const { filteredTargetEmailList, activEmailObjArray } = action.payload
      const newEmailListEntry = {
        ...filteredTargetEmailList[0],
        threads: filteredTargetEmailList[0].threads
          .concat(activEmailObjArray)
          .sort((a, b) => {
            return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
          }),
      }
      const updatedEmailList = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredTargetEmailList[0].labels)
        ),
        newEmailListEntry,
      ]
      state.emailList = updatedEmailList
      //   return {
      //     ...state,
      //     emailList: updatedEmailList,
      //   }
    },
    listRemoveItemDetail: (state, action) => {
      const { filteredCurrentEmailList, messageId } = action.payload
      const newEmailListEntry = {
        ...filteredCurrentEmailList[0],
        threads: filteredCurrentEmailList[0].threads.filter(
          (item) => item.id !== messageId
        ),
      }
      const updatedEmailList = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredCurrentEmailList[0].labels)
        ),
        newEmailListEntry,
      ]
      state.emailList = updatedEmailList
      //   return {
      //     ...state,
      //     emailList: updatedEmailList,
      //   }
    },
    listUpdateDetail: (state, action) => {},
  },
})

export const { listAddEmailList, listAddItemDetail, listRemoveItemDetail } =
  emailListSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const loadEmailDetails = (labeledThreads) => {
  return async (dispatch, getState) => {
    try {
      const { threads, labels, nextPageToken } = labeledThreads
      if (threads) {
        const buffer = []
        const loadCount = threads.length

        console.log(getState().labels.storageLabels)

        if (threads.length > 0) {
          threads.forEach(async (item) => {
            const threadDetail = await api.getThreadDetail(item.id)
            buffer.push(threadDetail.thread)
            if (buffer.length === loadCount) {
              dispatch(
                listAddEmailList({
                  labels,
                  threads: buffer,
                  nextPageToken: nextPageToken ?? null,
                })
              )
              // If base isn't fully loaded yet, add the additional loadedInbox

              dispatch(setLoadedInbox(labels))

              // if (!getState().base.baseLoaded) {
              //   dispatch(setLoadedInbox(labels))
              // }
              // If base isn't fully loaded yet but all current inboxes are loaded, unveil the app.
              if (
                getState().labels.storageLabels.length ===
                getState().labels.loadedInbox.length
              ) {
                dispatch(setIsLoading(false))
                // dispatch(setBaseLoaded(true))
              }
              // if (
              //   !getState().base.baseLoaded &&
              //   getState().labels.storageLabels.length ===
              //     getState().labels.loadedInbox.length
              // ) {
              //   dispatch(setIsLoading(false))
              //   // dispatch(setBaseLoaded(true))
              // }
              // If base is fully loaded, set loading to false, as a backup.
              // if (getState().base.baseLoaded) {
              //   dispatch(setIsLoading(false))
              //   // In case the base is already loaded, but an additional inbox is loaded.
              //   if (
              //     !multipleIncludes(
              //       labels,
              //       getState().labels.storageLabels.map((label) => label.id)
              //     )
              //   ) {
              //     dispatch(setLoadedInbox(labels))
              //     // Check if the label is complete object, if not filter out the object via an api listing.
              //     labels.map((element) => {
              //       if (
              //         Object.prototype.hasOwnProperty.call(element, 'name') &&
              //         Object.prototype.hasOwnProperty.call(element, 'id')
              //       ) {
              //         return dispatch(setStorageLabels(element))
              //       }
              //       return api.fetchLabel().then((fetchedLabels) => {
              //         if (fetchedLabels) {
              //           if (fetchedLabels.message.labels.length > 0) {
              //             const labelArray = fetchedLabels.message.labels
              //             dispatch(
              //               setStorageLabels(
              //                 labels.map((baseLabel) =>
              //                   labelArray.filter(
              //                     (singleLabel) =>
              //                       singleLabel.name === baseLabel
              //                   )
              //                 )
              //               )
              //             )
              //           }
              //         }
              //       })
              //     })
              //   }
              // }
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
          console.log(
            labels.some(
              (val) => getState().labels.loadedInbox.flat(1).indexOf(val) === -1
            )
          )
          console.log(labels)
          dispatch(setLoadedInbox(labels))
        }
        // console.log(`Empty Inbox for ${labels}`);
        if (
          !getState().base.baseLoaded &&
          getState().labels.storageLabels.length ===
            getState().labels.loadedInbox.length
        ) {
          dispatch(setIsLoading(false))
          // dispatch(setBaseLoaded(true))
        }
      }
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error hydrating emails.'))
    }
  }
}

export const UpdateEmailListLabel = (props) => {
  const {
    messageId,
    request,
    request: { addLabelIds, removeLabelIds },
  } = props

  return async (dispatch, getState) => {
    try {
      const { emailList } = getState().email
      const filteredCurrentEmailList =
        emailList &&
        removeLabelIds &&
        FilteredEmailList({ emailList, labelIds: removeLabelIds })
      const filteredTargetEmailList =
        emailList &&
        addLabelIds &&
        FilteredEmailList({ emailList, labelIds: addLabelIds })
      return axios
        .patch(`/api/message/${messageId}`, request)
        .then((res) => {
          if (res.status === 200) {
            if (addLabelIds) {
              const activEmailObjArray =
                filteredCurrentEmailList[0].threads.filter(
                  (item) => item.id === messageId
                )
              dispatch(
                listAddItemDetail({
                  activEmailObjArray,
                  filteredTargetEmailList,
                })
              )
            }
            if (removeLabelIds) {
              dispatch(
                listRemoveItemDetail({
                  messageId,
                  filteredCurrentEmailList,
                })
              )
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectEmailList = (state) => state.email.emailList
export const selectNextPageToken = (state) =>
  state.email.emailList.nextPageToken

export default emailListSlice.reducer
