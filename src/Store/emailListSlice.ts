/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import threadApi from '../data/threadApi'
import {
  setIsLoading,
  setIsSilentLoading,
  setServiceUnavailable,
} from './utilsSlice'
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

// TODO: Ensure no double emails
// const uniqueCandidates = [
//   ...new Set(
//     [...state.candidates, ...action.payload].map((candidate) =>
//       JSON.stringify(candidate)
//     )
//   ),
// ].map((string) => JSON.parse(string))
// state.candidates = uniqueCandidates

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
      // Find emailList sub-array index
      const arrayIndex: number = state.emailList
        .map((emailArray) => emailArray.labels)
        .flat(1)
        .findIndex((obj) => obj.includes(action.payload.labels))

      // If emailList sub-array index exists, add to or update the existing array
      if (arrayIndex > -1) {
        // It loops through all the newly fetched threads, and if check what to do with this. Either push it to the tempArray, or update the entry in the emailList state.
        const tempArray: any = []
        let activeCount: number = 0
        const completeCount: number = action.payload.threads.length - 1

        action.payload.threads.map((thread: any) => {
          const objectIndex = state.emailList[arrayIndex].threads.findIndex(
            (item) => item.id === action.payload.threads[0].id
          )

          if (objectIndex === -1) {
            activeCount += 1
            tempArray.push(thread)
          }

          if (objectIndex > -1) {
            activeCount += 1
            const currentState = state.emailList
            currentState[arrayIndex].threads[objectIndex] = thread
            sortThreads(currentState[arrayIndex].threads)
            state.emailList = currentState
          }

          if (activeCount === completeCount) {
            const currentState = state.emailList
            const concatNewEmailThreads = currentState[arrayIndex].threads
              .concat(tempArray)
              .sort(
                (a, b) => parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
              )
            console.log(concatNewEmailThreads)
            const newObject: EmailListObject = {
              ...action.payload,
              threads: concatNewEmailThreads,
            }
            currentState[arrayIndex] = newObject
            state.emailList = currentState
          }

          return null
        })
      } else {
        const sortedEmailList: EmailListObject = {
          ...action.payload,
          threads: sortThreads(action.payload.threads),
        }
        state.emailList.push(sortedEmailList)
      }
    },
    listAddItemDetail: (state, action) => {
      const {
        filteredTargetEmailList,
        activEmailObjArray,
      }: {
        filteredTargetEmailList: EmailListObject[]
        activEmailObjArray: EmailListThreadItem[]
      } = action.payload
      const objectIndex: number = filteredTargetEmailList[0].threads.findIndex(
        (item) => item.id === activEmailObjArray[0].id
      )
      // If the object doesn't exist yet on the array, add it - otherwise do nothing since the item already exists.
      if (objectIndex === -1) {
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
      }
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
    location,
  } = props

  return async (dispatch, getState, history) => {
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
          const viewIndexState = filteredCurrentEmailList[0].threads.findIndex(
            (item) => item.id === messageId
          )
          NavigateNextMail({
            history,
            labelIds,
            filteredCurrentEmailList,
            viewIndexState,
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
