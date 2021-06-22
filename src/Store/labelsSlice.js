/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import createApiClient from '../data/api'
import { setServiceUnavailable } from './utilsSlice'

const api = createApiClient()

export const labelsSlice = createSlice({
  name: 'labels',
  initialState: {
    labelIds: '',
    loadedInbox: [],
    storageLabels: [],
  },
  reducers: {
    setCurrentLabels: (state, action) => {
      state.labelIds = action.payload
    },
    setLoadedInbox: (state, action) => {
      const labelArray = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]
      if (!state.loadedInbox.includes(labelArray)) {
        state.loadedInbox = [...new Set([...state.loadedInbox, labelArray])]
      }
      return {
        ...state,
      }
    },
    setStorageLabels: (state, action) => {
      if (!Array.isArray(action.payload)) {
        const labelIdName = {
          id: action.payload.id,
          name: action.payload.name,
        }
        state.storageLabels = [...state.storageLabels, labelIdName]
      }
      const labelIdNameArray = action.payload.map((label) => ({
        id: label[0].id,
        name: label[0].name,
      }))
      state.storageLabels = [...state.storageLabels, ...labelIdNameArray]
    },
  },
})

export const { setCurrentLabels, setLoadedInbox, setStorageLabels } =
  labelsSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const createLabel = (label) => {
  return async (dispatch) => {
    try {
      const body = {
        labelVisibility: label.labelVisibility ?? 'labelShow',
        messageListVisibility: label.messageListVisibility ?? 'show',
        name: label.name ?? label,
      }
      return axios
        .post(`/api/labels`, body)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setStorageLabels(res.data.message))
          } else {
            dispatch(setServiceUnavailable('Error creating label.'))
          }
        })
        .catch((err) => console.log(err))
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error creating label.'))
    }
    return null
  }
}

export const fetchLabelIds = (LABEL) => {
  return async (dispatch) => {
    try {
      const listAllLabels = await api.fetchLabel()
      const {
        message: { labels },
      } = listAllLabels
      if (labels) {
        const labelObject = labels.filter((label) => label.name === LABEL)
        if (labelObject.length > 0) {
          // console.log(labelObject)
          dispatch(setCurrentLabels([labelObject[0].id]))
          dispatch(setStorageLabels([labelObject[0].id]))
        } else {
          dispatch(setServiceUnavailable('Error fetching label.'))
        }
      } else {
        dispatch(setServiceUnavailable('Error fetching label.'))
      }
    } catch (err) {
      console.log(err)
      dispatch(setServiceUnavailable('Error fetching label.'))
    }
    // TO-DO: What if multiple labels are used
  }
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectDraft = (state) => state.draftList

export default labelsSlice.reducer
