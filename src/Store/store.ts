import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import baseReducer from './baseSlice'
import composeReducer from './composeSlice'
import emailReducer from './emailListSlice'
import emailDetailReducer from './emailDetailSlice'
import draftsReducer from './draftsSlice'
import labelsReducer from './labelsSlice'
import metaReducer from './metaListSlice'
import utilsReducer from './utilsSlice'

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
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store
