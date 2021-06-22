/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export const emailDetailSlice = createSlice({
  name: 'emailDetail',
  initialState: {
    currEmail: '',
    viewIndex: 0,
  },
  reducers: {
    setCurrentEmail: (state, action) => {
      state.currEmail = action.payload
    },
    setViewingIndex: (state, action) => {
      const viewingIndex = action.payload.metaList
        .map(function getIndex(e) {
          return e.id
        })
        .indexOf(action.payload.currEmail)
      state.viewIndex = viewingIndex
    },
  },
})

export const { setCurrentEmail, setViewingIndex } = emailDetailSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectDraft = (state) => state.draftList

export default emailDetailSlice.reducer
