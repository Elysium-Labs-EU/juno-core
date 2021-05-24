import axios from 'axios'
import { createApiClient } from '../data/api'
const api = createApiClient()

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
  LIST_REMOVE_META: 'LIST_REMOVE_META',
  LIST_UPDATE_META: 'LIST_UPDATE_META',
  LIST_ADD_DETAIL: 'LIST_ADD_DETAIL',
  LIST_REMOVE_DETAIL: 'LIST_REMOVE_DETAIL',
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

export const listUpdateMeta = (metaList) => {
  return {
    type: ACTION_TYPE.LIST_UPDATE_META,
    payload: metaList,
  }
}

export const listRemoveMeta = (metaList) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_META,
    payload: metaList,
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

export const listUpdateDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_UPDATE_DETAIL,
    payload: emailList,
  }
}

export const checkBase = () => {
  const BASE_ARRAY = ['Juno', 'Juno/To Do', 'Juno/Keep', 'Juno/Reminder']
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
          dispatch(setBaseLoaded(true))
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
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const metaList = await api.getThreads(params)
    const { labelIds } = params
    // console.log('metaList', metaList)
    if (metaList) {
      if (metaList.message.resultSizeEstimate > 0) {
        const { threads, nextPageToken } = metaList.message
        const labeledThreads = threads.map((item) => ({ ...item, labelIds }))
        dispatch(listUpdateMeta(labeledThreads))
        dispatch(setNextPageToken(nextPageToken ?? null))
        dispatch(loadEmailDetails(metaList))
        dispatch(setLoadedInbox(labelIds))
      } else {
        dispatch(setServiceUnavailable('No feed found'))
        console.log('Empty Label Inbox')
        dispatch(setIsLoading(false))
      }
    } else {
      dispatch(setServiceUnavailable('No feed found'))
      dispatch(setIsLoading(false))
    }
  }
}

export const loadEmailDetails = (metaList) => {
  return async (dispatch) => {
    const { threads } = metaList.message
    if (threads) {
      let buffer = []
      let loadCount = threads.length
      threads.length > 0 &&
        threads.forEach(async (item) => {
          const threadDetail = await api.getThreadDetail(item.id)
          buffer.push(threadDetail)
          if (buffer.length === loadCount) {
            dispatch(listAddDetail(buffer))
            dispatch(setIsLoading(false))
          }
        })
    } else {
      console.log('Empty Label Inbox')
      dispatch(setIsLoading(false))
    }
  }
}

//Use a checkfeed of 100 items, compare this to the current MetaList, if the checkFeeds newest item
// is newer than the metaList, cut off the items from the checkfeed which are older than the newest metaList item
export const refreshEmailFeed = (params, metaList) => {
  return async (dispatch) => {
    const checkFeed = await api.getThreads(params)
    if (checkFeed.message.threads[0].historyId > metaList[0].historyId) {
      const newThreads = checkFeed.message.threads.filter(
        (thread) => thread.historyId > metaList[0].historyId
      )
      const newThreadsObject = { message: { threads: [...newThreads] } }
      dispatch(listUpdateMeta(newThreads))
      dispatch(loadEmailDetails(newThreadsObject))
    } else {
      console.log('No new messages')
    }
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
        dispatch(setCurrentLabels(labelObject[0].id))
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
