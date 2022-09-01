/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { AppThunk, RootState } from './store'
import labelApi from '../data/labelApi'
import { setServiceUnavailable, setSettingsLabelId } from './utilsSlice'
import { GoogleLabel, LabelIdName, LabelState } from './storeTypes/labelsTypes'
import { SETTINGS_DELIMITER, SETTINGS_LABEL } from '../constants/baseConstants'

const initialState: LabelState = Object.freeze({
  labelIds: [],
  loadedInbox: [],
  storageLabels: [],
})

export const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    setCurrentLabels: (state, { payload }) => {
      state.labelIds = payload
    },
    setLoadedInbox: (state, { payload }) => {
      const doesLabelAlreadyExist =
        state.loadedInbox.length > 0 &&
        state.loadedInbox
          .map((item) => item.includes(payload[0]))
          .filter((result) => result === false)

      if (!doesLabelAlreadyExist) {
        state.loadedInbox.push(payload)
      }
      if (doesLabelAlreadyExist && doesLabelAlreadyExist.length > 0) {
        state.loadedInbox = [...state.loadedInbox, payload]
      }
    },
    setStorageLabels: (state, { payload }) => {
      if (!Array.isArray(payload)) {
        const labelIdName: LabelIdName = {
          id: payload.id,
          name: payload.name,
        }
        state.storageLabels = [...state.storageLabels, labelIdName]
      }
      if (Array.isArray(payload)) {
        const labelIdNameArray = payload.map((label: GoogleLabel[]) => ({
          id: label[0]?.id,
          name: label[0]?.name,
        }))
        state.storageLabels = [...state.storageLabels, ...labelIdNameArray]
      }
    },
  },
})

export const { setCurrentLabels, setLoadedInbox, setStorageLabels } =
  labelsSlice.actions

export const createLabel =
  (label: string): AppThunk =>
  async (dispatch) => {
    try {
      const body =
        typeof label === 'string'
          ? {
              name: label,
              labelVisibility: 'labelShow',
              messageListVisibility: 'show',
            }
          : label

      const response = await labelApi().createLabel(body)

      if (response?.status === 200) {
        dispatch(setStorageLabels(response.data))
        if (
          response?.data?.data?.name.startsWith(
            `${SETTINGS_LABEL + SETTINGS_DELIMITER}`
          )
        ) {
          dispatch(setSettingsLabelId(response.data.data.id))
        }
      } else {
        dispatch(setServiceUnavailable('Error creating label.'))
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error creating label.'))
    }
    return null
  }

export const fetchLabelIds =
  (LABEL: string): AppThunk =>
  async (dispatch) => {
    try {
      const { labels } = await labelApi().fetchLabels()
      if (labels) {
        const labelObject = labels.filter(
          (label: LabelIdName) => label.name === LABEL
        )
        if (labelObject.length > 0) {
          dispatch(setCurrentLabels([labelObject[0].id]))
          dispatch(setStorageLabels([labelObject[0].id]))
        } else {
          dispatch(setServiceUnavailable('Error fetching label.'))
        }
      } else {
        dispatch(setServiceUnavailable('Error fetching label.'))
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error fetching label.'))
    }
    // TO-DO: What if multiple labels are used
  }

export const selectLabelIds = (state: RootState) => state.labels.labelIds
export const selectLoadedInbox = (state: RootState) => state.labels.loadedInbox
export const selectStorageLabels = (state: RootState) =>
  state.labels.storageLabels

export default labelsSlice.reducer
