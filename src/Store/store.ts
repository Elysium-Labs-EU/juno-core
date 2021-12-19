import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { createReduxHistoryContext } from 'redux-first-history'
import { createBrowserHistory } from 'history'
import baseReducer from './baseSlice'
import composeReducer from './composeSlice'
import contactsReducer from './contactsSlice'
import emailReducer from './emailListSlice'
import emailDetailReducer from './emailDetailSlice'
import draftsReducer from './draftsSlice'
import labelsReducer from './labelsSlice'
import utilsReducer from './utilsSlice'

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() })

export const store = configureStore({
  reducer: {
    base: baseReducer,
    compose: composeReducer,
    contacts: contactsReducer,
    email: emailReducer,
    emailDetail: emailDetailReducer,
    drafts: draftsReducer,
    labels: labelsReducer,
    utils: utilsReducer,
    router: routerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware),
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
