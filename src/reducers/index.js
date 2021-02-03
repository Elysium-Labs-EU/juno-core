import { combineReducers } from 'redux'

import emailListReducer from './emailList'
import isLoggedReducer from './isLogged'

const allReducers = combineReducers({
  emailList: emailListReducer,
  // isLogged: isLoggedReducer
})

export default allReducers
