import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
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
export type AppThunk<ReturnType = void | Promise<any | void>> = ThunkAction<
  ReturnType,
  RootState,
  any,
  Action<string>
>
export const store = setupStore()
export const history = createReduxHistory(store)
