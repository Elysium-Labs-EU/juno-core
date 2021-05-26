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
      return {
        ...state,
        baseLoaded: action.payload,
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
      console.log(action.payload)
      const labelArray = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]
      console.log(labelArray)
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
      return {
        ...state,
        metaList: action.payload,
      }
    case ACTION_TYPE.LIST_REMOVE_META:
      return {
        ...state,
        metaList: action.payload,
      }
    case ACTION_TYPE.LIST_UPDATE_META:
      if (Array.isArray(action.payload)) {
        let newMetaList = [
          ...new Set([
            ...state.metaList,
            ...(Array.isArray(action.payload)
              ? action.payload
              : [action.payload]),
          ]),
        ]
        let sortedMetaList = newMetaList.sort((a, b) => {
          return parseInt(b.historyId) - parseInt(a.historyId)
        })
        return {
          ...state,
          metaList: [...new Set([...sortedMetaList])],
        }
      } else {
        let new_metaList = state.metaList.filter(
          (item) => action.payload.id !== item.id
        )
        return {
          ...state,
          metaList: new_metaList,
        }
      }
    case ACTION_TYPE.LIST_UPDATE_DETAIL:
      return {
        ...state,
        // emailList: sortedEmailList,
        // }
      }
    case ACTION_TYPE.LIST_ADD_DETAIL:
      let newEmailList = [
        ...new Set([
          ...state.emailList,
          ...(Array.isArray(action.payload)
            ? action.payload
            : [action.payload]),
        ]),
      ]
      let sortedEmailList = newEmailList.sort((a, b) => {
        return parseInt(b.thread.historyId) - parseInt(a.thread.historyId)
      })
      return {
        ...state,
        emailList: sortedEmailList,
        // }
        // } else {
        //   let new_emailList = state.emailList.filter(
        //     (item) => action.payload.id !== item.id
        //   )
        //   console.log(action.payload)
        //   return {
        //     ...state,
        //     emailList: new_emailList,
        //     // historyDiscoverKeywords: [
        //     //   ...state.historyDiscoverKeywords,
        //     //   action.payload,
        //     // ],
        //   }
      }
    case ACTION_TYPE.LIST_REMOVE_DETAIL:
      return {
        ...state,
        emailList: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
