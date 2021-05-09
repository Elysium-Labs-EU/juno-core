export const ACTION_TYPE = {
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_NEXTPAGETOKEN: 'SET_NEXTPAGETOKEN',
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
