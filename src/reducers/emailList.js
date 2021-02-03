const emailListReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIST-ADD-EMAIL':
      return state + action.payload
    case 'LIST-REMOVE-EMAIL':
      return state - 1
    default:
      return state
  }
}

export default emailListReducer
