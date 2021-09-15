/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import threadApi from '../data/threadApi'
import { setIsLoading, setServiceUnavailable } from './utilsSlice'
import { setLoadedInbox } from './labelsSlice'
import { FilteredEmailList } from '../utils'
import messageApi from '../data/messageApi'
import * as draft from '../constants/draftConstants'
import NavigateNextMail from '../utils/navigateNextEmail'
import type { AppThunk, RootState } from './store'
import {
  EmailListThreadItem,
  EmailListObject,
  EmailListState,
} from './emailListSliceTypes'
import { UpdateRequestParams } from './metaEmailListSliceTypes'

const initialState: EmailListState = Object.freeze({
  emailList: [],
  isFocused: false,
  isSorting: false,
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
    listAddEmailList: (state, action) => {
      const sortedEmailList = {
        ...action.payload,
        threads: action.payload.threads.sort(
          (a: EmailListThreadItem, b: EmailListThreadItem) =>
            parseInt(b.messages[b.messages.length - 1].internalDate, 10) -
            parseInt(a.messages[a.messages.length - 1].internalDate, 10)
        ),
      }

      const arrayIndex = state.emailList
        .map((emailArray) => emailArray.labels)
        .flat(1)
        .findIndex((obj) => obj.includes(action.payload.labels))

      if (arrayIndex > -1) {
        const newArray = state.emailList[arrayIndex].threads
          .concat(sortedEmailList.threads)
          .sort(
            (a, b) =>
              parseInt(b.messages[b.messages.length - 1].internalDate, 10) -
              parseInt(a.messages[a.messages.length - 1].internalDate, 10)
          )
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
          .sort(
            (a: EmailListThreadItem, b: EmailListThreadItem) =>
              parseInt(b.messages[b.messages.length - 1].internalDate, 10) -
              parseInt(a.messages[a.messages.length - 1].internalDate, 10)
          ),
      }
      const updatedEmailList = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(filteredTargetEmailList[0].labels[0])
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
          (item: EmailListThreadItem) => item.id !== messageId
        ),
      }
      const updatedEmailList = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(filteredCurrentEmailList[0].labels[0])
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

export const loadEmailDetails =
  (labeledThreads: EmailListObject): AppThunk =>
  async (dispatch, getState) => {
    try {
      const { threads, labels, nextPageToken } = labeledThreads
      if (threads) {
        const buffer: EmailListThreadItem[] = []
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

export const UpdateEmailListLabel = (props: UpdateRequestParams): AppThunk => {
  const {
    messageId,
    request,
    request: { addLabelIds, removeLabelIds },
    labelIds,
    history,
    location,
    labelURL,
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
        if (
          location &&
          location.pathname.includes('/mail/') &&
          !getState().labels.labelIds.includes(draft.LABEL)
        ) {
          const { viewIndex } = getState().emailDetail
          NavigateNextMail({
            history,
            labelURL,
            filteredCurrentEmailList,
            viewIndex,
          })
        }
        const response: any = !request.delete
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
                (item: EmailListThreadItem) => item.id === messageId
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

export const selectIsFocused = (state: RootState) => state.email.isFocused
export const selectIsSorting = (state: RootState) => state.email.isSorting
export const selectEmailList = (state: RootState) => state.email.emailList
export const selectNextPageToken = (state: RootState) =>
  state.email.emailList.nextPageToken

export default emailListSlice.reducer
