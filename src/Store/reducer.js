import { ACTION_TYPE } from './actions'

export const initialState = {
  nextPageToken: undefined,
  metaList: [],
  emailList: [],
  isLoading: false,
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
        return {
          ...state,
          metaList: [
            ...new Set([
              ...state.metaList,
              ...(Array.isArray(action.payload)
                ? action.payload
                : [action.payload]),
            ]),
          ],
        }
      } else {
        let new_metaList = state.metaList.filter(
          (item) => action.payload.id !== item.id
        )
        // console.log(action.payload)
        return {
          ...state,
          metaList: new_metaList,
          // historyDiscoverKeywords: [
          //   ...state.historyDiscoverKeywords,
          //   action.payload,
          // ],
        }
      }
    case ACTION_TYPE.LIST_UPDATE_DETAIL:
      // if (Array.isArray(action.payload)) {
      return {
        ...state,
        emailList: [
          ...new Set([
            ...state.emailList,
            ...(Array.isArray(action.payload)
              ? action.payload
              : [action.payload]),
          ]),
        ],
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
    case ACTION_TYPE.LIST_ADD_DETAIL:
      return {
        ...state,
        emailList: [...state.emailList, ...action.payload],
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
