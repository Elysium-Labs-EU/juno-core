import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'store/store'

import type { TContact, TContactState } from './storeTypes/contactsTypes'

/* eslint-disable no-param-reassign */

const initialState: TContactState = Object.freeze({
  allContacts: [],
  contactNextPageToken: '',
  contactsLoaded: '',
})

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setAllContacts: (state, { payload }: PayloadAction<Array<TContact>>) => {
      const uniqueContacts = Object.values(
        [...state.allContacts, ...payload].reduce((acc, contact) => {
          const key = JSON.stringify(contact)
          if (!acc[key]) {
            acc[key] = contact
          }
          return acc
        }, {})
      )
      state.allContacts = uniqueContacts
    },
    setContactsLoaded: (
      state,
      { payload }: PayloadAction<TContactState['contactsLoaded']>
    ) => {
      state.contactsLoaded = payload
    },
  },
})

export const { setAllContacts, setContactsLoaded } = contactsSlice.actions

export const selectAllContacts = (state: RootState) =>
  state.contacts.allContacts
export const selectContactsLoaded = (state: RootState) =>
  state.contacts.contactsLoaded

export default contactsSlice.reducer
