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
} from './emailListTypes'
import { UpdateRequestParams } from './metaEmailListTypes'
import sortThreads from '../utils/sortThreads'

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
      const sortedEmailList: EmailListObject = {
        ...action.payload,
        threads: sortThreads(action.payload.threads),
      }

      const arrayIndex: number = state.emailList
        .map((emailArray) => emailArray.labels)
        .flat(1)
        .findIndex((obj) => obj.includes(action.payload.labels))

      if (arrayIndex > -1) {
        const newArray = () => {
          const concatArray = state.emailList[arrayIndex].threads.concat(
            sortedEmailList.threads
          )
          if (concatArray) {
            return sortThreads(concatArray)
          }
          return null
        }
        const newObject: EmailListObject = {
          ...action.payload,
          threads: newArray(),
        }
        const currentState = state.emailList
        currentState[arrayIndex] = newObject
        state.emailList = currentState
      } else {
        state.emailList.push(sortedEmailList)
      }
    },
    listAddItemDetail: (state, action) => {
      const { filteredTargetEmailList, activEmailObjArray } = action.payload
      const newEmailListEntry: EmailListObject = {
        ...filteredTargetEmailList[0],
        threads: sortThreads(
          filteredTargetEmailList[0].threads.concat(activEmailObjArray)
        ),
      }
      const updatedEmailList: EmailListObject[] = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(filteredTargetEmailList[0].labels[0])
        ),
        newEmailListEntry,
      ]
      state.emailList = updatedEmailList
    },
    listRemoveItemDetail: (state, action) => {
      const { filteredCurrentEmailList, messageId } = action.payload
      const newEmailListEntry: EmailListObject = {
        ...filteredCurrentEmailList[0],
        threads: filteredCurrentEmailList[0].threads.filter(
          (item: EmailListThreadItem) => item.id !== messageId
        ),
      }
      const updatedEmailList: EmailListObject[] = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(filteredCurrentEmailList[0].labels[0])
        ),
        newEmailListEntry,
      ]
      state.emailList = updatedEmailList
    },
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
      if (filteredCurrentEmailList && filteredCurrentEmailList.length > 0) {
        if (
          location &&
          location.pathname.includes('/mail/') &&
          !getState().labels.labelIds.includes(draft.LABEL)
        ) {
          const { viewIndex } = getState().emailDetail
          NavigateNextMail({
            history,
            labelIds,
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
export const selectNextPageToken = (state: any) =>
  state.email.emailList.nextPageToken

export default emailListSlice.reducer
