export const ACTION_TYPE = {
  SET_NEXTPAGETOKEN: 'SET_NEXTPAGETOKEN',
  LIST_ADD_EMAIL: 'LIST_ADD_EMAIL',
  LIST_REMOVE_EMAIL: 'LIST_REMOVE_EMAIL',
  LIST_ADD_DETAIL: 'LIST_ADD_DETAIL',
  LIST_REMOVE_DETAIL: 'LIST_REMOVE_DETAIL',
}

export const setNextPageToken = (nextPageToken) => {
  return {
    type: ACTION_TYPE.SET_NEXTPAGETOKEN,
    payload: nextPageToken,
  }
}

export const listAddEmail = (metaList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_EMAIL,
    payload: metaList,
  }
}

export const listRemoveEmail = (metaList) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_EMAIL,
    payload: metaList,
  }
}

export const listAddEmailDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_ADD_DETAIL,
    payload: emailList,
  }
}

export const listRemoveEmailDetail = (emailList) => {
  return {
    type: ACTION_TYPE.LIST_REMOVE_DETAIL,
    payload: emailList,
  }
}