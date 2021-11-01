import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import baseReducer from './baseSlice'
import composeReducer from './composeSlice'
import emailReducer from './emailListSlice'
import emailDetailReducer from './emailDetailSlice'
import draftsReducer from './draftsSlice'
import labelsReducer from './labelsSlice'
import metaReducer from './metaListSlice'
import utilsReducer from './utilsSlice'
import history from '../utils/history'

const store = configureStore({
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: history,
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch | any
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  typeof history,
  Action<string>
>

export default store
