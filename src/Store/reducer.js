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
  draftList: [],
  composeEmail: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_BASE_LOADED: {
      if (!state.baseLoaded) {
        return {
          ...state,
          baseLoaded: action.payload,
        }
      }
      return { ...state }
    }

    case ACTION_TYPE.SET_SERVICE_UNAVAILABLE: {
      return {
        ...state,
        serviceUnavailable: action.payload,
      }
    }
    case ACTION_TYPE.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    case ACTION_TYPE.SET_LOADED_INBOX: {
      const labelArray = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]
      if (!state.loadedInbox.includes(labelArray)) {
        return {
          ...state,
          loadedInbox: [...new Set([...state.loadedInbox, labelArray])],
        }
      }
      return {
        ...state,
      }
    }

    case ACTION_TYPE.SET_NEXTPAGETOKEN: {
      return {
        ...state,
        nextPageToken: action.payload,
      }
    }
    case ACTION_TYPE.SET_LABEL_IDS: {
      return {
        ...state,
        labelIds: action.payload,
      }
    }
    case ACTION_TYPE.SET_STORAGE_LABELS: {
      if (!Array.isArray(action.payload)) {
        const labelIdName = {
          id: action.payload.id,
          name: action.payload.name,
        }
        return {
          ...state,
          storageLabels: [...state.storageLabels, labelIdName],
        }
      }
      const labelIdNameArray = action.payload.map((label) => ({
        id: label[0].id,
        name: label[0].name,
      }))
      return {
        ...state,
        storageLabels: [...state.storageLabels, ...labelIdNameArray],
      }
    }

    case ACTION_TYPE.SET_CURR_EMAIL: {
      return {
        ...state,
        currEmail: action.payload,
      }
    }
    case ACTION_TYPE.SET_VIEW_INDEX: {
      const viewingIndex = action.payload.metaList
        .map(function getIndex(e) {
          return e.id
        })
        .indexOf(action.payload.currEmail)
      return {
        ...state,
        viewIndex: viewingIndex,
      }
    }
    case ACTION_TYPE.LIST_ADD_META: {
      const sortedMetaList = {
        ...action.payload,
        threads: action.payload.threads.sort((a, b) => {
          return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
        }),
      }

      const arrayIndex = state.metaList
        .map((metaArray) => metaArray.labels)
        .flat(1)
        .findIndex((obj) => obj.includes(action.payload.labels))
      if (arrayIndex > -1) {
        const newArray = state.metaList[arrayIndex].threads
          .concat(sortedMetaList.threads)
          .sort((a, b) => {
            return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
          })
        const newObject = { ...action.payload, threads: newArray }
        const currentState = state.metaList
        currentState[arrayIndex] = newObject
        return {
          ...state,
          metaList: [...currentState],
        }
      }
      return {
        ...state,
        metaList: [...state.metaList, sortedMetaList],
      }
    }
    // case ACTION_TYPE.LIST_REMOVE_META:
    //   return {
    //     ...state,
    //     metaList: [...state.metaList, action.payload],
    //   }
    case ACTION_TYPE.LIST_ADD_ITEM_META: {
      const { filteredTargetMetaList, activeMetaObjArray } = action.payload
      const newMetaListEntry = {
        ...filteredTargetMetaList[0],
        threads: filteredTargetMetaList[0].threads
          .concat(activeMetaObjArray)
          .sort((a, b) => {
            return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
          }),
      }
      const updatedMetaList = [
        ...state.metaList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredTargetMetaList[0].labels)
        ),
        newMetaListEntry,
      ]
      return {
        ...state,
        metaList: updatedMetaList,
      }
    }
    case ACTION_TYPE.LIST_REMOVE_ITEM_META: {
      const { filteredCurrentMetaList, messageId } = action.payload
      const newMetaListEntry = {
        ...filteredCurrentMetaList[0],
        threads: filteredCurrentMetaList[0].threads.filter(
          (item) => item.id !== messageId
        ),
      }
      const updatedMetaList = [
        ...state.metaList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredCurrentMetaList[0].labels)
        ),
        newMetaListEntry,
      ]
      return {
        ...state,
        metaList: updatedMetaList,
      }
    }
    case ACTION_TYPE.LIST_UPDATE_DETAIL: {
      return {
        ...state,
        // emailList: sortedEmailList,
        // }
      }
    }
    case ACTION_TYPE.LIST_ADD_DETAIL: {
      const sortedEmailList = {
        ...action.payload,
        threads: action.payload.threads.sort((a, b) => {
          return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
        }),
      }

      const arrayIndex = state.emailList
        .map((emailArray) => emailArray.labels)
        .flat(1)
        .findIndex((obj) => obj.includes(action.payload.labels))

      if (arrayIndex > -1) {
        const newArray = state.emailList[arrayIndex].threads
          .concat(sortedEmailList.threads)
          .sort((a, b) => {
            return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
          })
        const newObject = { ...action.payload, threads: newArray }
        const currentState = state.emailList
        currentState[arrayIndex] = newObject
        return {
          ...state,
          emailList: [...currentState],
        }
      }
      return {
        ...state,
        emailList: [...state.emailList, sortedEmailList],
      }
    }
    // return {
    //   ...state,
    //   emailList: [...state.emailList, sortedEmailList],
    // }}
    case ACTION_TYPE.LIST_ADD_ITEM_DETAIL: {
      const { filteredTargetEmailList, activEmailObjArray } = action.payload
      const newEmailListEntry = {
        ...filteredTargetEmailList[0],
        threads: filteredTargetEmailList[0].threads
          .concat(activEmailObjArray)
          .sort((a, b) => {
            return parseInt(b.historyId, 10) - parseInt(a.historyId, 10)
          }),
      }
      const updatedEmailList = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredTargetEmailList[0].labels)
        ),
        newEmailListEntry,
      ]
      return {
        ...state,
        emailList: updatedEmailList,
      }
    }
    case ACTION_TYPE.LIST_REMOVE_ITEM_DETAIL: {
      const { filteredCurrentEmailList, messageId } = action.payload
      const newEmailListEntry = {
        ...filteredCurrentEmailList[0],
        threads: filteredCurrentEmailList[0].threads.filter(
          (item) => item.id !== messageId
        ),
      }
      const updatedEmailList = [
        ...state.emailList.filter(
          (threadList) =>
            !threadList.labels.includes(...filteredCurrentEmailList[0].labels)
        ),
        newEmailListEntry,
      ]
      return {
        ...state,
        emailList: updatedEmailList,
      }
    }

    case ACTION_TYPE.LIST_ADD_DRAFT: {
      console.log(action.payload)
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          draftList: action.payload,
        }
      }
      return { ...state }
    }
    case ACTION_TYPE.LIST_UPDATE_DRAFT: {
      return { ...state }
    }
    case ACTION_TYPE.LIST_REMOVE_DRAFT: {
      return { ...state }
    }

    case ACTION_TYPE.SET_COMPOSE_EMAIL: {
      if (
        JSON.stringify(Object.keys(action.payload)) ===
        JSON.stringify(['to', 'subject', 'body'])
      ) {
        return { ...state, composeEmail: action.payload }
      }
      if (action.payload.id && action.payload.value) {
        const currentState = state.composeEmail
        currentState[action.payload.id] = action.payload.value
        return {
          ...state,
          composeEmail: currentState,
        }
      }
      return { ...state }
    }

    case ACTION_TYPE.UPDATE_COMPOSE_EMAIL: {
      if (action.payload.id && action.payload.value) {
        const currentState = state.composeEmail
        currentState[action.payload.id] = action.payload.value
        return {
          ...state,
          composeEmail: state.composeEmail,
        }
      }
      return { ...state }
    }

    case ACTION_TYPE.RESET_COMPOSE_EMAIL: {
      return {
        ...state,
        composeEmail: {},
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
