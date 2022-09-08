/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { AppThunk, RootState } from './store'
import labelApi from '../data/labelApi'
import { setServiceUnavailable, setSettingsLabelId } from './utilsSlice'
import { GoogleLabel, LabelIdName, LabelState } from './storeTypes/labelsTypes'
import { SETTINGS_DELIMITER, SETTINGS_LABEL } from '../constants/baseConstants'
import { fetchEmailsSimple } from './emailListSlice'
import { getLabelByRoute } from '../constants/labelMapConstant'

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
      state.loadedInbox = [...new Set([...state.loadedInbox, payload])]
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
  extraReducers: (builder) => {
    builder.addCase(
      fetchEmailsSimple.fulfilled,
      (state, { payload: { labels } }) => {
        if (labels) {
          state.loadedInbox = [...state.loadedInbox, ...labels]
        }
      }
    )
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

export const removeLabel =
  (labelId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await labelApi().deleteLabel(labelId)
      if (response?.status !== 204) {
        dispatch(setServiceUnavailable('Error removing label.'))
      }
    } catch (err) {
      dispatch(setServiceUnavailable('Error removing label.'))
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
  }

export const setCurrentLabel = (): AppThunk => (dispatch, getState) => {
  const activePath = getState().router.location?.pathname
  const { storageLabels } = getState().labels

  if (activePath) {
    const currentLabelName = getLabelByRoute[activePath]
    const labelObject = storageLabels.find(
      (label) => label.name === currentLabelName
    )
    if (labelObject) {
      dispatch(setCurrentLabels([labelObject.id]))
    } else {
      dispatch(
        setServiceUnavailable(
          'Error setting current label - label is not found'
        )
      )
    }
  } else {
    dispatch(setServiceUnavailable('Error setting getting current location'))
  }
}

export const selectLabelIds = (state: RootState) => state.labels.labelIds
export const selectLoadedInbox = (state: RootState) => state.labels.loadedInbox
export const selectStorageLabels = (state: RootState) =>
  state.labels.storageLabels

export default labelsSlice.reducer
