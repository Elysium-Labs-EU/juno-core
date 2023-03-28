import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { Action, PreloadedState, ThunkAction } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'

import baseReducer from 'store/baseSlice'
import contactsReducer from 'store/contactsSlice'
import draftsReducer from 'store/draftsSlice'
import emailDetailReducer from 'store/emailDetailSlice'
import emailReducer from 'store/emailListSlice'
import labelsReducer from 'store/labelsSlice'
import utilsReducer from 'store/utilsSlice'

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  })

const rootReducer = combineReducers({
  base: baseReducer,
  contacts: contactsReducer,
  drafts: draftsReducer,
  email: emailReducer,
  emailDetail: emailDetailReducer,
  labels: labelsReducer,
  router: routerReducer,
  utils: utilsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(routerMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  })
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void | Promise<any>> = ThunkAction<
  ReturnType,
  RootState,
  any,
  Action<string>
>

export const store = setupStore()
export const history = createReduxHistory(store)
