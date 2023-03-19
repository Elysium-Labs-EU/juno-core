import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import userApi from 'data/userApi'
import { setBaseEmailList } from 'store/emailListSlice'
import { setStorageLabels } from 'store/labelsSlice'
import type { AppThunk, RootState } from 'store/store'
import type { TBaseState, TPrefetchedBoxes } from 'store/storeTypes/baseTypes'
import type { TGmailV1SchemaLabelSchema } from 'store/storeTypes/labelsTypes'
import { setSettingsLabelId, setSystemStatusUpdate } from 'store/utilsSlice'
import createSettingsLabel from 'utils/settings/createSettingsLabel'
import findSettings from 'utils/settings/findSettings'
import parseSettings from 'utils/settings/parseSettings'

import type { TBaseEmailList } from './storeTypes/emailListTypes'

/* eslint-disable no-param-reassign */

const initialState: TBaseState = Object.freeze({
  baseLoaded: false,
  profile: {
    signature: '',
    name: '',
    picture: '',
    emailAddress: '',
    messagesTotal: 0,
    threadsTotal: 0,
    historyId: '',
  },
  isAuthenticated: false,
})

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setBaseLoaded: (
      state,
      { payload }: PayloadAction<TBaseState['baseLoaded']>
    ) => {
      if (!state.baseLoaded) {
        state.baseLoaded = payload
      }
    },
    setIsAuthenticated: (
      state,
      { payload }: PayloadAction<TBaseState['isAuthenticated']>
    ) => {
      state.isAuthenticated = payload
    },
    setProfile: (state, { payload }: PayloadAction<TBaseState['profile']>) => {
      state.profile = payload
    },
  },
})

export const { setBaseLoaded, setIsAuthenticated, setProfile } =
  baseSlice.actions

export const handleSettings =
  (labels: Array<TGmailV1SchemaLabelSchema>): AppThunk =>
  async (dispatch) => {
    const settingsLabel = findSettings(labels, dispatch)
    if (!settingsLabel || !settingsLabel.id) {
      createSettingsLabel(dispatch)
      return
    }
    dispatch(setSettingsLabelId(settingsLabel.id))
    parseSettings(dispatch, settingsLabel)
  }

/**
 * @function presetEmailList
 * @param prefetchedBoxes
 * @returns adding all the required emailboxes as empty shells to the Redux state. To ensure that the position of the boxes are static.
 */

const presetEmailList =
  (prefetchedBoxes: TPrefetchedBoxes): AppThunk =>
  (dispatch) => {
    const emailListBuffer = [] as TBaseEmailList

    prefetchedBoxes.forEach((emailContainer) => {
      if (emailContainer && emailContainer?.id) {
        const presetEmailBox = {
          labels: [emailContainer.id],
          threads: [] as Array<any>,
          nextPageToken: null,
        }
        emailListBuffer.push(presetEmailBox)
      } else {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: 'We cannot setup all the email boxes.',
          })
        )
      }
    })

    dispatch(setBaseEmailList(emailListBuffer))
  }

export const getBase = (): AppThunk => async (dispatch) => {
  try {
    const response = await userApi().baseCheck()
    if ('data' in response && response.status === 200) {
      dispatch(setProfile(response.data?.profile))
      dispatch(presetEmailList(response.data?.prefetchedBoxes))
      dispatch(setStorageLabels(response.data?.prefetchedBoxes))
      dispatch(handleSettings(response.data?.labels))
      dispatch(setBaseLoaded(true))
    }
  } catch (err) {
    console.error(err)
    dispatch(
      setSystemStatusUpdate({
        type: 'error',
        message: 'An error occured during loading the base.',
      })
    )
  }
}

export const selectBaseLoaded = (state: RootState) => state.base.baseLoaded
export const selectIsAuthenticated = (state: RootState) =>
  state.base.isAuthenticated
export const selectProfile = (state: RootState) => state.base.profile

export default baseSlice.reducer
