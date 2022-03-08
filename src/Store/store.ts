import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { createReduxHistoryContext } from 'redux-first-history'
import { createMemoryHistory, createBrowserHistory } from 'history'
import isElectron from 'is-electron'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import baseReducer from './baseSlice'
import composeReducer from './composeSlice'
import contactsReducer from './contactsSlice'
import emailReducer from './emailListSlice'
import emailDetailReducer from './emailDetailSlice'
import draftsReducer from './draftsSlice'
import labelsReducer from './labelsSlice'
import utilsReducer from './utilsSlice'

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: isElectron() ? createMemoryHistory() : createBrowserHistory(),
  })

const reducers = combineReducers({
  base: baseReducer,
  compose: composeReducer,
  contacts: contactsReducer,
  email: emailReducer,
  emailDetail: emailDetailReducer,
  drafts: draftsReducer,
  labels: labelsReducer,
  utils: utilsReducer,
  router: routerReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['compose', 'router', 'utils'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
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
