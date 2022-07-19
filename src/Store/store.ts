import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { createReduxHistoryContext } from 'redux-first-history'
import { createBrowserHistory } from 'history'
import baseReducer from './baseSlice'
import contactsReducer from './contactsSlice'
import draftsReducer from './draftsSlice'
import emailReducer from './emailListSlice'
import emailDetailReducer from './emailDetailSlice'
import labelsReducer from './labelsSlice'
import utilsReducer from './utilsSlice'

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  })

export const store = configureStore({
  reducer: {
    base: baseReducer,
    contacts: contactsReducer,
    drafts: draftsReducer,
    email: emailReducer,
    emailDetail: emailDetailReducer,
    labels: labelsReducer,
    router: routerReducer,
    utils: utilsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export const history = createReduxHistory(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch | any
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  any,
  Action<string>
>
