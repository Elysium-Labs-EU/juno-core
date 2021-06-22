import { configureStore } from '@reduxjs/toolkit'
import baseReducer from './baseSlice'
import draftsReducer from './draftsSlice'
import labelsReducer from './labelsSlice'

export default configureStore({
  reducer: {
    base: baseReducer,
    drafts: draftsReducer,
    labels: labelsReducer,
  },
})
