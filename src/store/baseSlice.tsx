import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import CustomToast from 'components/Elements/Toast/Toast'
import { JUNO_SETTINGS_LOCAL } from 'constants/globalConstants'
import userApi from 'data/userApi'
import { setBaseEmailList } from 'store/emailListSlice'
import { setStorageLabels } from 'store/labelsSlice'
import type { AppThunk, RootState } from 'store/store'
import type { TBaseState, TPrefetchedBoxes } from 'store/storeTypes/baseTypes'
import { setSettings, setSettingsLabel } from 'store/utilsSlice'

import type { TBaseEmailList } from './storeTypes/emailListTypes'
import type { TGmailV1SchemaLabelSchema } from './storeTypes/gmailBaseTypes/gmailTypes'
import type { TUserSettings } from './storeTypes/gmailBaseTypes/otherTypes'

/* eslint-disable no-param-reassign */

const initialState: TBaseState = Object.freeze({
  baseError: null,
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
    setBaseError: (
      state,
      { payload }: PayloadAction<TBaseState['baseError']>
    ) => {
      state.baseError = payload
    },
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

export const { setBaseError, setBaseLoaded, setIsAuthenticated, setProfile } =
  baseSlice.actions

export const handleSettings =
  (
    userSettings: TUserSettings,
    userSettingsLabel: TGmailV1SchemaLabelSchema
  ): AppThunk =>
    (dispatch) => {
      dispatch(setSettingsLabel(userSettingsLabel))
      dispatch(setSettings(userSettings))
      localStorage.setItem(JUNO_SETTINGS_LOCAL, JSON.stringify(userSettings))
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

      prefetchedBoxes.forEach(({ id }) => {
        if (id) {
          const presetEmailBox = {
            labels: [id],
            threads: [] as Array<unknown>,
            nextPageToken: null,
          }
          emailListBuffer.push(presetEmailBox)
        } else {
          toast.custom((t) => (
            <CustomToast
              specificToast={t}
              title="We cannot setup all the email boxes."
              variant="error"
            />
          ))
        }
      })

      dispatch(setBaseEmailList(emailListBuffer))
    }

export const getBase = (): AppThunk => async (dispatch) => {
  try {
    const response = await userApi().baseCheck()
    if (response && 'data' in response && response.status === 200) {
      const { profile, prefetchedBoxes, userSettingsLabel, userSettings } =
        response.data

      dispatch(setProfile(profile))
      dispatch(presetEmailList(prefetchedBoxes))
      dispatch(setStorageLabels(prefetchedBoxes))
      dispatch(handleSettings(userSettings, userSettingsLabel))
      dispatch(setBaseLoaded(true))
    } else {
      dispatch(setBaseError({ message: 'An error occured during loading.' }))
      toast.custom((t) => (
        <CustomToast
          specificToast={t}
          title="An error occured during loading."
          variant="error"
        />
      ))
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(
      setBaseError({
        message: 'An error occured during loading the base.',
        cause: JSON.stringify(err),
      })
    )
    toast.custom((t) => (
      <CustomToast
        specificToast={t}
        title="An error occured during loading the base."
        variant="error"
      />
    ))
  }
}

export const selectBaseError = (state: RootState) => state.base.baseError
export const selectBaseLoaded = (state: RootState) => state.base.baseLoaded
export const selectIsAuthenticated = (state: RootState) =>
  state.base.isAuthenticated
export const selectProfile = (state: RootState) => state.base.profile

export default baseSlice.reducer
