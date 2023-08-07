import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'store/store'
import deduplicateItems from 'utils/deduplicateItems'

import type { TContact, TContactState } from './storeTypes/contactsTypes'

const initialState: TContactState = Object.freeze({
  allContacts: null,
  contactNextPageToken: '',
  contactsLoaded: '',
})

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setAllContacts: (state, { payload }: PayloadAction<Array<TContact>>) => {
      const uniqueContacts = deduplicateItems(state.allContacts ? [...state.allContacts, ...payload] : payload)
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
