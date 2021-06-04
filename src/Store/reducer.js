import { ACTION_TYPE } from './actions'

export const initialState = {
  baseLoaded: false,
  serviceUnavailable: null,
  isLoading: false,
  loadedInbox: [],
  nextPageToken: undefined,
  currEmail: '',
  viewIndex: 0,
  storageLabels: [],
  labelIds: '',
  metaList: [],
  emailList: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_BASE_LOADED:
      if (!state.baseLoaded) {
        return {
          ...state,
          baseLoaded: action.payload,
        }
      } else {
        return { ...state }
      }
    case ACTION_TYPE.SET_SERVICE_UNAVAILABLE:
      return {
        ...state,
        serviceUnavailable: action.payload,
      }
    case ACTION_TYPE.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case ACTION_TYPE.SET_LOADED_INBOX:
      const labelArray = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]
      if (!state.loadedInbox.includes(labelArray)) {
        return {
          ...state,
          loadedInbox: [...new Set([...state.loadedInbox, labelArray])],
        }
      } else {
        return {
          ...state,
        }
      }
    case ACTION_TYPE.SET_NEXTPAGETOKEN:
      return {
        ...state,
        nextPageToken: action.payload,
      }
    case ACTION_TYPE.SET_LABEL_IDS:
      return {
        ...state,
        labelIds: action.payload,
      }
    case ACTION_TYPE.SET_STORAGE_LABELS:
      if (!Array.isArray(action.payload)) {
        const labelIdName = { id: action.payload.id, name: action.payload.name }
        return {
          ...state,
          storageLabels: [...state.storageLabels, labelIdName],
        }
      } else {
        const labelIdNameArray = action.payload.map((label) => ({
          id: label[0].id,
          name: label[0].name,
        }))
        return {
          ...state,
          storageLabels: [...state.storageLabels, ...labelIdNameArray],
        }
      }
    case ACTION_TYPE.SET_CURR_EMAIL:
      return {
        ...state,
        currEmail: action.payload,
      }
    case ACTION_TYPE.SET_VIEW_INDEX:
      const viewingIndex = action.payload.metaList
        .map(function (e) {
          return e.id
        })
        .indexOf(action.payload.currEmail)
      return {
        ...state,
        viewIndex: viewingIndex,
      }
    case ACTION_TYPE.LIST_ADD_META:
      let sortedMetaList = {
        ...action.payload,
        threads: action.payload.threads.sort((a, b) => {
          return parseInt(b.historyId) - parseInt(a.historyId)
        }),
      }
      return {
        ...state,
        metaList: [...state.metaList, sortedMetaList],
      }
    // case ACTION_TYPE.LIST_REMOVE_META:
    //   return {
    //     ...state,
    //     metaList: [...state.metaList, action.payload],
    //   }
    case ACTION_TYPE.LIST_ADD_ITEM_META: {
      let { filteredTargetMetaList, activeMetaObjArray } = action.payload
      let new_metaListEntry = {
        ...filteredTargetMetaList[0],
        threads: filteredTargetMetaList[0].threads
          .concat(activeMetaObjArray)
          .sort((a, b) => {
            return parseInt(b.historyId) - parseInt(a.historyId)
          }),
      }
      let updatedMetaList = [
        ...state.metaList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredTargetMetaList[0].labels)
        ),
        new_metaListEntry,
      ]
      return {
        ...state,
        metaList: updatedMetaList,
      }
    }
    case ACTION_TYPE.LIST_REMOVE_ITEM_META: {
      let { filteredCurrentMetaList, messageId } = action.payload
      let new_metaListEntry = {
        ...filteredCurrentMetaList[0],
        threads: filteredCurrentMetaList[0].threads.filter(
          (item) => item.id !== messageId
        ),
      }
      let updatedMetaList = [
        ...state.metaList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredCurrentMetaList[0].labels)
        ),
        new_metaListEntry,
      ]
      return {
        ...state,
        metaList: updatedMetaList,
      }
    }
    case ACTION_TYPE.LIST_UPDATE_DETAIL:
      return {
        ...state,
        // emailList: sortedEmailList,
        // }
      }
    case ACTION_TYPE.LIST_ADD_DETAIL:
      let sortedEmailList = {
        ...action.payload,
        threads: action.payload.threads.sort((a, b) => {
          return parseInt(b.historyId) - parseInt(a.historyId)
        }),
      }
      return {
        ...state,
        emailList: [...state.emailList, sortedEmailList],
      }
    case ACTION_TYPE.LIST_ADD_ITEM_DETAIL: {
      let { filteredTargetEmailList, activEmailObjArray } = action.payload
      let new_emailListEntry = {
        ...filteredTargetEmailList[0],
        threads: filteredTargetEmailList[0].threads
          .concat(activEmailObjArray)
          .sort((a, b) => {
            return parseInt(b.historyId) - parseInt(a.historyId)
          }),
      }
      let updatedEmailList = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredTargetEmailList[0].labels)
        ),
        new_emailListEntry,
      ]
      return {
        ...state,
        emailList: updatedEmailList,
      }
    }
    case ACTION_TYPE.LIST_REMOVE_ITEM_DETAIL: {
      let { filteredCurrentEmailList, messageId } = action.payload
      let new_emailListEntry = {
        ...filteredCurrentEmailList[0],
        threads: filteredCurrentEmailList[0].threads.filter(
          (item) => item.id !== messageId
        ),
      }
      let updatedEmailList = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredCurrentEmailList[0].labels)
        ),
        new_emailListEntry,
      ]
      return {
        ...state,
        emailList: updatedEmailList,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
