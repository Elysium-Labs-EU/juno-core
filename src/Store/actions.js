import axios from 'axios'
import { createApiClient } from '../data/api'
import { FilteredEmailList, FilteredMetaList, NavigateNextMail } from '../utils'
const api = createApiClient()

const BASE_MAX_RESULTS = 20

export const ACTION_TYPE = {
  SET_BASE_LOADED: 'SET_BASE_LOADED',
  SET_SERVICE_UNAVAILABLE: 'SET_SERVICE_UNAVAILABLE',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_LOADED_INBOX: 'SET_LOADED_INBOX',
  SET_NEXTPAGETOKEN: 'SET_NEXTPAGETOKEN',
  SET_CURR_EMAIL: 'SET_CURR_EMAIL',
  SET_VIEW_INDEX: 'SET_VIEW_INDEX',
  SET_LABEL_IDS: 'SET_LABEL_IDS',
  SET_STORAGE_LABELS: 'SET_STORAGE_LABELS',
  LIST_ADD_META: 'LIST_ADD_META',
  LIST_ADD_ITEM_META: 'LIST_ADD_ITEM_META',
  LIST_REMOVE_ITEM_META: 'LIST_REMOVE_ITEM_META',
  LIST_ADD_DETAIL: 'LIST_ADD_DETAIL',
  LIST_REMOVE_DETAIL: 'LIST_REMOVE_DETAIL',
  LIST_ADD_ITEM_DETAIL: 'LIST_ADD_ITEM_DETAIL',
  LIST_REMOVE_ITEM_DETAIL: 'LIST_REMOVE_ITEM_DETAIL',
  LIST_UPDATE_DETAIL: 'LIST_UPDATE_DETAIL',
}

export const setBaseLoaded = (baseLoaded) => ({
  type: ACTION_TYPE.SET_BASE_LOADED,
  payload: baseLoaded,
})

export const setServiceUnavailable = (serviceUnavailableError) => ({
  type: ACTION_TYPE.SET_SERVICE_UNAVAILABLE,
  payload: serviceUnavailableError,
})

export const setIsLoading = (isLoading) => ({
  type: ACTION_TYPE.SET_IS_LOADING,
  payload: isLoading,
})

export const setLoadedInbox = (loadedInbox) => ({
  type: ACTION_TYPE.SET_LOADED_INBOX,
  payload: loadedInbox,
})

export const setNextPageToken = (nextPageToken) => {
  return {
    type: ACTION_TYPE.SET_NEXTPAGETOKEN,
    payload: nextPageToken,
  }
}

export const setCurrentEmail = (threadId) => {
  return {
    type: ACTION_TYPE.SET_CURR_EMAIL,
    payload: threadId,
  }
}

export const setViewingIndex = (requestBody) => {
  return {
    type: ACTION_TYPE.SET_VIEW_INDEX,
    payload: requestBody,
  }
}

export const setStorageLabels = (labels) => {
  return {
    type: ACTION_TYPE.SET_STORAGE_LABELS,
    payload: labels,
  }
}

export const setCurrentLabels = (labels) => {
  return {
    type: ACTION_TYPE.SET_LABEL_IDS,
    payload: labels,
  }
}

export const listAddMeta = (metaList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_META,
    payload: metaList,
  }
}

export const listAddItemMeta = (metaList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_ITEM_META,
    payload: metaList,
  }
}

export const listRemoveItemMeta = (props) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_ITEM_META,
    payload: props,
  }
}

export const listAddDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_DETAIL,
    payload: emailList,
  }
}

export const listRemoveDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_DETAIL,
    payload: emailList,
  }
}

export const listAddItemDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_ITEM_DETAIL,
    payload: emailList,
  }
}

export const listRemoveItemDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_ITEM_DETAIL,
    payload: emailList,
  }
}

export const listUpdateDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_UPDATE_DETAIL,
    payload: emailList,
  }
}

export const checkBase = () => {
  const BASE_ARRAY = [
    'Juno',
    'Juno/To Do',
    'Juno/Keep',
    'Juno/Reminder',
    'INBOX',
    'SPAM',
    'DRAFT',
    'SENT',
  ]
  return async (dispatch) => {
    const labels = await api.fetchLabel()
    if (labels) {
      if (labels.message.labels.length > 0) {
        let labelArray = labels.message.labels
        const multipleIncludes = (first, second) => {
          const indexArray = first.map((el) => {
            return second.indexOf(el)
          })
          return indexArray.indexOf(-1) === -1
        }
        if (
          !multipleIncludes(
            BASE_ARRAY,
            labelArray.map((item) => item.name)
          )
        ) {
          console.log('You do not have all labels.')
          BASE_ARRAY.map((item) =>
            labelArray.map((label) => label.name).includes(item)
          ).map(
            (checkValue, index) =>
              !checkValue && dispatch(createLabel(BASE_ARRAY[index]))
          )
          dispatch(setBaseLoaded(true))
        } else {
          console.log('Gotcha! All minimal required labels.')
          dispatch(
            setStorageLabels(
              BASE_ARRAY.map((baseLabel) =>
                labelArray.filter((item) => item.name === baseLabel)
              )
            )
          )
          const prefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
            labelArray.filter((item) => item.name === baseLabel)
          )
          prefetchedBoxes.forEach((label) => {
            const params = {
              labelIds: [label[0].id],
              maxResults: BASE_MAX_RESULTS,
            }
            dispatch(loadEmails(params))
          })
        }
      } else {
        dispatch(setServiceUnavailable('Network Error. Please try again later'))
      }
    } else {
      dispatch(setServiceUnavailable('Network Error. Please try again later'))
    }
  }
}

export const loadEmails = (params) => {
  return async (dispatch, getState) => {
    if (!getState().isLoading) {
      dispatch(setIsLoading(true))
    }
    const metaList = await api.getThreads(params)
    const { labelIds } = params
    if (metaList) {
      if (metaList.message.resultSizeEstimate > 0) {
        const { threads, nextPageToken } = metaList.message
        const labeledThreads = {
          labels: labelIds,
          threads: threads,
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
  }
}

export const loadEmailDetails = (labeledThreads) => {
  return async (dispatch, getState) => {
    const { threads, labels, nextPageToken } = labeledThreads
    if (threads) {
      let buffer = []
      let loadCount = threads.length
      threads.length > 0 &&
        threads.forEach(async (item) => {
          const threadDetail = await api.getThreadDetail(item.id)
          buffer.push(threadDetail.thread)
          if (buffer.length === loadCount) {
            dispatch(
              listAddDetail({
                labels: labels,
                threads: buffer,
                nextPageToken: nextPageToken ?? null,
              })
            )
            dispatch(setLoadedInbox(labels))
            if (
              !getState().baseLoaded &&
              getState().storageLabels.length === getState().loadedInbox.length
            ) {
              dispatch(setIsLoading(false))
              dispatch(setBaseLoaded(true))
            }
          }
        })
    } else {
      dispatch(setLoadedInbox(labels))
      console.log(`Empty Inbox for ${labels}`)
      dispatch(setIsLoading(false))
    }
  }
}

//Use a checkfeed of 100 items, compare this to the current MetaList, if the checkFeeds newest item
// is newer than the metaList, cut off the items from the checkfeed which are older than the newest metaList item
export const refreshEmailFeed = (params, metaList) => {
  return async (dispatch) => {
    console.log('WIP need to change listUpdateMeta function')
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

export const fetchLabelIds = (LABEL) => {
  return async (dispatch) => {
    const listAllLabels = await api.fetchLabel()
    const {
      message: { labels },
    } = listAllLabels
    if (labels) {
      const labelObject = labels.filter((label) => label.name === LABEL)
      if (labelObject.length > 0) {
        // console.log(labelObject)
        dispatch(setCurrentLabels([labelObject[0].id]))
        dispatch(setStorageLabels([labelObject[0].id]))
      } else {
        dispatch(setServiceUnavailable('Error fetching label.'))
      }
    } else {
      dispatch(setServiceUnavailable('Error fetching label.'))
    }
    //TO-DO: What if multiple labels are used
  }
}

export const createLabel = (label) => {
  return async (dispatch) => {
    const body = {
      labelVisibility: label.labelVisibility ?? 'labelShow',
      messageListVisibility: label.messageListVisibility ?? 'show',
      name: label.name ?? label,
    }
    return axios
      .post(`/api/labels`, body)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setStorageLabels(res.data.message))
        } else {
          dispatch(setServiceUnavailable('Error creating label.'))
        }
      })
      .catch((err) => console.log(err))
  }
}

export const UpdateMailLabel = (props) => {
  const {
    messageId,
    request,
    request: { addLabelIds, removeLabelIds },
    history,
    labelURL,
  } = props

  return async (dispatch, getState) => {
    const metaList = getState().metaList
    const emailList = getState().emailList
    const filteredCurrentMetaList =
      metaList &&
      removeLabelIds &&
      FilteredMetaList({ metaList, labelIds: removeLabelIds })
    const filteredTargetMetaList =
      metaList &&
      addLabelIds &&
      FilteredMetaList({ metaList, labelIds: addLabelIds })
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
            const activeMetaObjArray = filteredCurrentMetaList[0].threads.filter(
              (item) => item.id === messageId
            )
            dispatch(
              listAddItemMeta({ activeMetaObjArray, filteredTargetMetaList })
            )
            const activEmailObjArray = filteredCurrentEmailList[0].threads.filter(
              (item) => item.id === messageId
            )
            dispatch(
              listAddItemDetail({ activEmailObjArray, filteredTargetEmailList })
            )
          }
          if (removeLabelIds) {
            dispatch(listRemoveItemMeta({ messageId, filteredCurrentMetaList }))
            dispatch(
              listRemoveItemDetail({ messageId, filteredCurrentEmailList })
            )
          }
          if (getState().currEmail) {
            const viewIndex = getState().viewIndex
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
  }
}
