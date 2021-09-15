/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppThunk, RootState } from './store'
import labelApi from '../data/labelApi'
import { setServiceUnavailable } from './utilsSlice'

interface GoogleLabel {
  id: string
  labelListVisibility: string
  messageListVisibility: string
  name: string
  type: string
}
interface LabelIdName {
  id: string
  name: string
}
interface LabelState {
  labelIds: string
  loadedInbox: string[][]
  storageLabels: LabelIdName[]
}

const initialState: LabelState = Object.freeze({
  labelIds: '',
  loadedInbox: [],
  storageLabels: [],
})

const api = labelApi()

export const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    setCurrentLabels: (state, action) => {
      state.labelIds = action.payload
    },
    setLoadedInbox: (state, action) => {
      const labelArray: string[] = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]
      if (!state.loadedInbox.includes(labelArray)) {
        state.loadedInbox = [...new Set([...state.loadedInbox, labelArray])]
      }
    },
    setStorageLabels: (state, action) => {
      if (!Array.isArray(action.payload)) {
        const labelIdName: LabelIdName = {
          id: action.payload.id,
          name: action.payload.name,
        }
        state.storageLabels = [...state.storageLabels, labelIdName]
      }
      const labelIdNameArray = action.payload.map((label: GoogleLabel[]) => ({
        id: label[0].id,
        name: label[0].name,
      }))
      state.storageLabels = [...state.storageLabels, ...labelIdNameArray]
    },
  },
})

export const { setCurrentLabels, setLoadedInbox, setStorageLabels } =
  labelsSlice.actions

export const createLabel =
  (label: GoogleLabel): AppThunk =>
  async (dispatch) => {
    try {
      const body = {
        labelVisibility: label.labelListVisibility ?? 'labelShow',
        messageListVisibility: label.messageListVisibility ?? 'show',
        name: label.name ?? label,
      }
      return await axios
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

export const fetchLabelIds =
  (LABEL: string): AppThunk =>
  async (dispatch) => {
    try {
      const listAllLabels = await api.fetchLabel()
      const {
        message: { labels },
      } = listAllLabels
      if (labels) {
        const labelObject = labels.filter(
          (label: LabelIdName) => label.name === LABEL
        )
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

export const selectLabelIds = (state: RootState) => state.labels.labelIds
export const selectLoadedInbox = (state: RootState) => state.labels.loadedInbox
export const selectStorageLabels = (state: RootState) =>
  state.labels.storageLabels

export default labelsSlice.reducer
