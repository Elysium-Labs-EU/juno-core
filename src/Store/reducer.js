import { ACTION_TYPE } from './actions'

export const initialState = {
  isLoading: false,
  nextPageToken: undefined,
  currEmail: '',
  viewIndex: 0,
  labelIds: '',
  metaList: [],
  emailList: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
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
    case ACTION_TYPE.SET_CURR_EMAIL:
      return {
        ...state,
        currEmail: action.payload,
      }
    case ACTION_TYPE.SET_VIEW_INDEX:
      const viewingIndex = action.payload.emailList
        .map(function (e) {
          return e.thread.id
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
          metaList: sortedMetaList,
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
      console.log(sortedEmailList)
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
