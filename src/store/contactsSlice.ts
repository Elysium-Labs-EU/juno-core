import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// import contactApi from 'data/contactApi'
import type { RootState } from 'store/store'
// import type { IContact } from 'store/storeTypes/contactsTypes'
// import { setSystemStatusUpdate } from 'store/utilsSlice'

/* eslint-disable no-param-reassign */

interface IContactState {
  allContacts: any
  contactNextPageToken: string
  contactsLoaded: string
}

const initialState: IContactState = Object.freeze({
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
    setContactsNextPageToken: (state, { payload }: PayloadAction<Pick<IContactState, 'contactNextPageToken'>['contactNextPageToken']>) => {
      state.contactNextPageToken = payload
    },
    setContactsLoaded: (state, { payload }: PayloadAction<Pick<IContactState, 'contactsLoaded'>['contactsLoaded']>) => {
      state.contactsLoaded = payload
    },
  },
})

export const { setAllContacts, setContactsLoaded, setContactsNextPageToken } =
  contactsSlice.actions

// export const getAllContacts =
//   (params: any): AppThunk =>
//   async (dispatch) => {
//     try {
//       const responseAllContacts = await contactApi().getAllContacts(params)
//       if (responseAllContacts.status === 200) {
//         const {
//           data: {
//             message: { otherContacts, nextPageToken },
//           },
//         } = responseAllContacts
//         dispatch(
//           setAllContacts(
//             otherContacts.map((contact: any) => ({
//               name: contact.person.names[0].displayName,
//               emailAddress: contact.person.emailAddresses[0].value,
//             }))
//           )
//         )
//         dispatch(setContactsNextPageToken(nextPageToken))
//         dispatch(setContactsLoaded(true))
//       }
//     } catch (err) {
//       dispatch(
//         setSystemStatusUpdate({
//           type: 'error',
//           message: 'Error fetching contacts.',
//         })
//       )
//     }
//   }

// export const querySpecificContacts =
//   (params: any): AppThunk =>
//   async (dispatch) => {
//     try {
//       const responseQueryContacts = await contactApi().queryContacts(params)
//       if (responseQueryContacts.status === 200) {
//         const {
//           data: {
//             message: { results },
//           },
//         } = responseQueryContacts
//         dispatch(
//           setAllContacts(
//             results.map(
//               (contact: any): IContact => ({
//                 name: Object.prototype.hasOwnProperty.call(
//                   contact.person,
//                   'names'
//                 )
//                   ? contact.person.names[0].displayName
//                   : contact.person.emailAddresses[0].value,
//                 emailAddress: contact.person.emailAddresses[0].value,
//               })
//             )
//           )
//         )
//         dispatch(setContactsLoaded(true))
//       }
//     } catch (err) {
//       dispatch(
//         setSystemStatusUpdate({
//           type: 'error',
//           message: 'Error fetching contacts.',
//         })
//       )
//     }
//   }

export const selectAllContacts = (state: RootState) =>
  state.contacts.allContacts
export const selectContactsLoaded = (state: RootState) =>
  state.contacts.contactsLoaded

export default contactsSlice.reducer
