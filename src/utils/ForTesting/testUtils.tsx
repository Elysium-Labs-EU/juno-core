/* eslint-disable import/prefer-default-export */
import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { EnhancedStore, PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type { RootState } from '../../store/store'
// As a basic setup, import your same slice reducers
import baseReducer from '../../store/baseSlice'
import contactsReducer from '../../store/contactsSlice'
import draftsReducer from '../../store/draftsSlice'
import emailReducer from '../../store/emailListSlice'
import emailDetailReducer from '../../store/emailDetailSlice'
import labelsReducer from '../../store/labelsSlice'
import utilsReducer from '../../store/utilsSlice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState> | any
    store?: EnhancedStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                base: baseReducer,
                contacts: contactsReducer,
                drafts: draftsReducer,
                email: emailReducer,
                emailDetail: emailDetailReducer,
                labels: labelsReducer,
                // router: routerReducer,
                utils: utilsReducer,
            }, preloadedState
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}