export const initialState = {
  metaList: [],
  emailList: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST-ADD-EMAIL':
      return {
        ...state,
        metaList: action.payload,
      }
    case 'LIST-REMOVE-EMAIL':
      return {
        ...state,
        metaList: action.payload,
      }
    case 'LIST-ADD-DETAILS':
      return {
        ...state,
        emailList: action.payload,
      }
    case 'LIST-REMOVE-DETAILS':
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
