/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { IContact } from './storeTypes/contactsTypes'
import { setServiceUnavailable } from './utilsSlice'
import type { AppThunk, RootState } from './store'
import contactApi from '../data/contactApi'

interface ContactState {
  allContacts: any
  contactNextPageToken: string
  contactsLoaded: string
}

const initialState: ContactState = Object.freeze({
  allContacts: [],
  contactNextPageToken: '',
  contactsLoaded: '',
})

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setAllContacts: (state, action) => {
      const uniqueContacts = [
        ...new Set(
          [...state.allContacts, ...action.payload].map((contact) =>
            JSON.stringify(contact)
          )
        ),
      ].map((string) => JSON.parse(string))
      state.allContacts = uniqueContacts
    },
    setContactsNextPageToken: (state, action) => {
      state.contactNextPageToken = action.payload
    },
    setContactsLoaded: (state, action) => {
      state.contactsLoaded = action.payload
    },
  },
})

export const { setAllContacts, setContactsLoaded, setContactsNextPageToken } =
  contactsSlice.actions

export const getAllContacts =
  (params: any): AppThunk =>
  async (dispatch) => {
    try {
      const responseAllContacts = await contactApi().getAllContacts(params)
      if (responseAllContacts.status === 200) {
        const {
          data: {
            message: { otherContacts, nextPageToken },
          },
        } = responseAllContacts
        dispatch(
          setAllContacts(
            otherContacts.map((contact: any) => ({
              name: contact.person.names[0].displayName,
              emailAddress: contact.person.emailAddresses[0].value,
            }))
          )
        )
        dispatch(setContactsNextPageToken(nextPageToken))
        dispatch(setContactsLoaded(true))
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error fetching contacts.'))
    }
  }

export const querySpecificContacts =
  (params: any): AppThunk =>
  async (dispatch) => {
    try {
      const responseQueryContacts = await contactApi().queryContacts(params)
      if (responseQueryContacts.status === 200) {
        const {
          data: {
            message: { results },
          },
        } = responseQueryContacts
        dispatch(
          setAllContacts(
            results.map(
              (contact: any): IContact => ({
                name: Object.prototype.hasOwnProperty.call(
                  contact.person,
                  'names'
                )
                  ? contact.person.names[0].displayName
                  : contact.person.emailAddresses[0].value,
                emailAddress: contact.person.emailAddresses[0].value,
              })
            )
          )
        )
        dispatch(setContactsLoaded(true))
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error fetching contacts.'))
    }
  }

export const selectAllContacts = (state: RootState) =>
  state.contacts.allContacts
export const selectContactsLoaded = (state: RootState) =>
  state.contacts.contactsLoaded

export default contactsSlice.reducer
