/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import threadApi from '../data/threadApi'
import { setIsLoading, setServiceUnavailable } from './utilsSlice'
import { setLoadedInbox } from './labelsSlice'
import { FilteredEmailList } from '../utils'
import messageApi from '../data/messageApi'

export const emailListSlice = createSlice({
  name: 'email',
  initialState: {
    emailList: [],
    isFocused: false,
    isSorting: false,
  },
  reducers: {
    setIsFocused: (state, action) => {
      state.isFocused = action.payload
    },
    setIsSorting: (state, action) => {
      state.isSorting = action.payload
    },
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
        state.emailList = currentState
      } else {
        state.emailList.push(sortedEmailList)
      }
      // state.emailList = [...state.emailList, sortedEmailList]
    },
    // listRemoveDetail: (state, action) => {},
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
    // listUpdateDetail: (state, action) => {},
  },
})

export const {
  setIsFocused,
  setIsSorting,
  listAddEmailList,
  listAddItemDetail,
  listRemoveItemDetail,
} = emailListSlice.actions

export const loadEmailDetails = (labeledThreads) => {
  return async (dispatch, getState) => {
    try {
      const { threads, labels, nextPageToken } = labeledThreads
      if (threads) {
        const buffer = []
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
              dispatch(setIsLoading(false))
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
        if (
          !getState().base.baseLoaded &&
          getState().labels.storageLabels.length ===
            getState().labels.loadedInbox.length
        ) {
          dispatch(setIsLoading(false))
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
    labelIds,
  } = props

  return async (dispatch, getState) => {
    try {
      const { emailList } = getState().email
      const filteredCurrentEmailList =
        emailList && (removeLabelIds || request.delete) && removeLabelIds
          ? FilteredEmailList({ emailList, labelIds: removeLabelIds })
          : FilteredEmailList({ emailList, labelIds })
      const filteredTargetEmailList =
        emailList &&
        addLabelIds &&
        FilteredEmailList({ emailList, labelIds: addLabelIds })
      if (filteredCurrentEmailList.length > 0) {
        const response = !request.delete
          ? await messageApi().updateMessage({ messageId, request })
          : await messageApi().thrashMessage({ messageId })
        if (response.status === 200) {
          if (
            addLabelIds &&
            filteredTargetEmailList &&
            filteredTargetEmailList.length > 0
          ) {
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
          if (removeLabelIds || request.delete) {
            dispatch(
              listRemoveItemDetail({
                messageId,
                filteredCurrentEmailList,
              })
            )
          }
        } else {
          dispatch(setServiceUnavailable('Error updating label2.'))
        }
      }
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error updating label3.'))
    }
    return null
  }
}

export const selectIsFocused = (state) => state.email.isFocused
export const selectIsSorting = (state) => state.email.isSorting
export const selectEmailList = (state) => state.email.emailList
export const selectNextPageToken = (state) =>
  state.email.emailList.nextPageToken

export default emailListSlice.reducer
