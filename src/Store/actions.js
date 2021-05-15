import { createApiClient } from '../data/api'
const api = createApiClient()

export const ACTION_TYPE = {
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

export const loadEmails = (labelIds, nextPageToken) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    if (nextPageToken) {
      const metaList = await api.getAdditionalThreads(labelIds, nextPageToken)
      if (metaList) {
        const { threads, nextPageToken } = metaList.message
        dispatch(listUpdateMeta(threads))
        dispatch(setNextPageToken(nextPageToken))
        dispatch(loadEmailDetails(metaList))
      } else {
        console.log('No feed found.')
      }
    } else {
      const metaList = await api.getInitialThreads(labelIds)
      if (metaList) {
        const { threads, nextPageToken } = metaList.message
        dispatch(listUpdateMeta(threads))
        dispatch(setNextPageToken(nextPageToken))
        dispatch(loadEmailDetails(metaList))
      } else {
        console.log('No feed found.')
      }
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
