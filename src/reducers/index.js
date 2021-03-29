import { ACTION_TYPE } from '../actions'

export const initialState = {
  nextPageToken: undefined,
  metaList: [],
  emailList: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_NEXTPAGETOKEN:
      return {
        ...state,
        nextPageToken: action.payload,
      }
    case ACTION_TYPE.LIST_ADD_EMAIL:
      return {
        ...state,
        metaList: action.payload,
      }
    case ACTION_TYPE.LIST_REMOVE_EMAIL:
      return {
        ...state,
        metaList: action.payload,
      }
    case ACTION_TYPE.LIST_ADD_DETAILS:
      return {
        ...state,
        emailList: action.payload,
      }
    case ACTION_TYPE.LIST_REMOVE_DETAILS:
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

export default rootReducer
