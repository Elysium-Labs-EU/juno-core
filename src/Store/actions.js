import { createApiClient } from '../data/api'
const api = createApiClient()

export const ACTION_TYPE = {
  SET_BASE_LOADED: 'SET_BASE_LOADED',
  SET_SERVICE_UNAVAILABLE: 'SET_SERVICE_UNAVAILABLE',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_NEXTPAGETOKEN: 'SET_NEXTPAGETOKEN',
  SET_CURR_EMAIL: 'SET_CURR_EMAIL',
  SET_VIEW_INDEX: 'SET_VIEW_INDEX',
  SET_LABEL_IDS: 'SET_LABEL_IDS',
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
  type: ACTION_TYPE.SET_BASE_LOADED,
  payload: serviceUnavailableError
})

export const setIsLoading = (isLoading) => ({
  type: ACTION_TYPE.SET_IS_LOADING,
  payload: isLoading,
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
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const labels = await api.fetchLabel()
    if (labels) {
      if (labels.message.labels.length > 0) {
        console.log(labels.message.labels.filter(label => label.name.includes('API TEST 2' || 'Tempo/Keep')))
      }
      dispatch(setBaseLoaded(true))
      dispatch(setIsLoading(false))
    } else {
      dispatch(setServiceUnavailable('Network Error. Please try again later'))
      dispatch(setIsLoading(false))
    }
  }
}

export const loadEmails = (params) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    const metaList = await api.getThreads(params)
    if (metaList) {
      const { threads, nextPageToken } = metaList.message
      dispatch(listUpdateMeta(threads))
      dispatch(setNextPageToken(nextPageToken))
      dispatch(loadEmailDetails(metaList))
    } else {
      dispatch(setServiceUnavailable('No feed found'))
    }
  }
}

export const loadEmailDetails = (metaList) => {
  return async (dispatch) => {
    const { threads } = metaList.message
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
