import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { SETTINGS_DELIMITER, SETTINGS_LABEL } from 'constants/baseConstants'
import { getLabelByRoute } from 'constants/labelMapConstant'
import labelApi from 'data/labelApi'
import { fetchEmailsSimple } from 'store/emailListSlice'
import type { AppThunk, RootState } from 'store/store'
import type {
  TGmailV1SchemaLabelSchema,
  TLabelState,
} from 'store/storeTypes/labelsTypes'
import { setSettingsLabelId, setSystemStatusUpdate } from 'store/utilsSlice'
import {
  parseSettingsLabel,
  storeUpdatedSettingsLabel,
} from 'utils/settings/updateSettingsLabel'
import type { IUpdateSettingsLabel } from 'utils/settings/updateSettingsLabel'

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
        TGmailV1SchemaLabelSchema | TGmailV1SchemaLabelSchema[][]
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
          const [firstLabel] = label
          if (firstLabel && firstLabel.name && firstLabel.id) {
            const labelIdName = {
              id: firstLabel.id,
              name: firstLabel.name,
              type: firstLabel?.type ?? 'user',
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

      if ('data' in response) {
        dispatch(setStorageLabels(response.data))
        if (
          response?.data?.name &&
          // response?.data?.data?.name.startsWith(
          response.data.name.startsWith(
            `${SETTINGS_LABEL + SETTINGS_DELIMITER}`
          )
        ) {
          if (response?.data?.id) {
            dispatch(setSettingsLabelId(response.data.id))
            // dispatch(setSettingsLabelId(response.data.data.id))
          }
        }
      } else {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: 'Unable to create the label.',
          })
        )
      }
    } catch (err) {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Unable to create the label.',
        })
      )
    }
  }

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
    settingsLabelId,
    emailFetchSize,
    showIntroduction,
    isAvatarVisible,
    isFlexibleFlowActive,
    alternateActions,
  }: IUpdateSettingsLabel): AppThunk =>
  (dispatch) => {
    storeUpdatedSettingsLabel(
      parseSettingsLabel({
        settingsLabelId,
        emailFetchSize,
        showIntroduction,
        isAvatarVisible,
        isFlexibleFlowActive,
        alternateActions,
      }),
      dispatch
    )
  }

export const selectLabelIds = (state: RootState) => state.labels.labelIds
export const selectLoadedInbox = (state: RootState) => state.labels.loadedInbox
export const selectStorageLabels = (state: RootState) =>
  state.labels.storageLabels

export default labelsSlice.reducer
