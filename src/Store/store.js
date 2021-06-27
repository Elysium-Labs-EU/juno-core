import { configureStore } from '@reduxjs/toolkit'
import baseReducer from './baseSlice'
import composeReducer from './composeSlice'
import emailReducer from './emailListSlice'
import emailDetailReducer from './emailDetailSlice'
import draftsReducer from './draftsSlice'
import labelsReducer from './labelsSlice'
import metaReducer from './metaListSlice'
import utilsReducer from './utilsSlice'

export default configureStore({
  reducer: {
    base: baseReducer,
    compose: composeReducer,
    email: emailReducer,
    emailDetail: emailDetailReducer,
    drafts: draftsReducer,
    labels: labelsReducer,
    meta: metaReducer,
    utils: utilsReducer,
  },
})
