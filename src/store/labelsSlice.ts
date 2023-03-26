import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getLabelByRoute } from 'constants/labelMapConstant'
import labelApi from 'data/labelApi'
import { fetchEmailsSimple } from 'store/emailListSlice'
import type { AppThunk, RootState } from 'store/store'
import type {
  TGmailV1SchemaLabelSchema,
  TLabelState,
  TUpdateSettingsLabelKeys,
} from 'store/storeTypes/labelsTypes'
import { setSystemStatusUpdate } from 'store/utilsSlice'
import isEmpty from 'utils/isEmpty'

/* eslint-disable no-param-reassign */

const initialState: TLabelState = Object.freeze({
  labelIds: [],
  loadedInbox: [],
  storageLabels: [],
})

const labelsSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    setCurrentLabels: (
      state,
      { payload }: PayloadAction<TLabelState['labelIds']>
    ) => {
      state.labelIds = payload
    },
    setLoadedInbox: (
      state,
      { payload }: PayloadAction<TLabelState['loadedInbox']>
    ) => {
      state.loadedInbox = [...new Set([...state.loadedInbox, ...payload])]
    },
    setStorageLabels: (
      state,
      {
        payload,
      }: PayloadAction<
        TGmailV1SchemaLabelSchema | Array<TGmailV1SchemaLabelSchema>
      >
    ) => {
      if (!Array.isArray(payload)) {
        const label = {
          id: payload.id,
          name: payload?.name,
          type: payload?.type ?? 'user',
        } as TLabelState['storageLabels'][0]
        if (label.id && label.name) {
          state.storageLabels = [...state.storageLabels, label]
        }
      }
      if (Array.isArray(payload)) {
        const labelIdNameArray = [] as TLabelState['storageLabels']
        payload.forEach((label) => {
          if (label && label.name && label.id) {
            const labelIdName = {
              id: label.id,
              name: label.name,
              type: label?.type ?? 'user',
            }
            labelIdNameArray.push(labelIdName)
          }
        })
        state.storageLabels = [...state.storageLabels, ...labelIdNameArray]
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmailsSimple.fulfilled, (state, { payload }) => {
      if (payload && 'labels' in payload) {
        const { labels } = payload
        if (labels) {
          state.loadedInbox = [...state.loadedInbox, ...labels]
        }
      }
    })
  },
})

export const { setCurrentLabels, setLoadedInbox, setStorageLabels } =
  labelsSlice.actions

export const removeLabel =
  (labelId: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await labelApi().deleteLabel(labelId)
      if ('status' in response && response.status !== 204) {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: 'Unable to remove the label.',
          })
        )
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Unable to remove the label.',
        })
      )
    }
    return null
  }

export const setCurrentLabel = (): AppThunk => (dispatch, getState) => {
  const activePath = getState().router.location?.pathname
  const { storageLabels } = getState().labels

  if (activePath) {
    const currentLabelName = getLabelByRoute[activePath]
    const labelObject = storageLabels.find(
      (label) => label.name === currentLabelName
    )
    if (labelObject && labelObject.id) {
      dispatch(setCurrentLabels([labelObject.id]))
    } else {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Unable to set current label - label is not found.',
        })
      )
    }
  } else {
    dispatch(
      setSystemStatusUpdate({
        type: 'error',
        message: 'Error getting the current location',
      })
    )
  }
}

export const updateSettingsLabel =
  ({
    key,
    value,
  }: {
    key: TUpdateSettingsLabelKeys
    value: string | number | boolean
  }): AppThunk =>
  async (dispatch, getState) => {
    const showIntroduction = false

    const {
      alternateActions,
      emailFetchSize,
      isAvatarVisible,
      isFlexibleFlowActive,
      settingsLabel,
    } = getState().utils

    const storedSettings = {
      alternateActions,
      emailFetchSize,
      isAvatarVisible,
      isFlexibleFlowActive,
      showIntroduction,
    }

    const adjustedSettings = { ...storedSettings, [key]: value }

    if (
      !adjustedSettings ||
      !settingsLabel ||
      isEmpty(adjustedSettings) ||
      !settingsLabel.id
    ) {
      throw Error('Cannot find settingsLabel')
    }

    try {
      const response = await labelApi().updateLabel({
        id: settingsLabel.id,
        requestBody: {
          value: adjustedSettings,
          isSettings: true,
          settingsLabel,
        },
      })
      if ('data' in response && response.data?.type !== 'user') {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: 'Unable to store settings.',
          })
        )
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Unable to store settings.',
        })
      )
    }
  }

export const selectLabelIds = (state: RootState) => state.labels.labelIds
export const selectLoadedInbox = (state: RootState) => state.labels.loadedInbox
export const selectStorageLabels = (state: RootState) =>
  state.labels.storageLabels

export default labelsSlice.reducer
