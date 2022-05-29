/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import labelApi from '../data/labelApi'
import userApi from '../data/userApi'
import { setServiceUnavailable, setSettingsLabelId } from './utilsSlice'
import { createLabel, setStorageLabels } from './labelsSlice'
import { BASE_ARRAY } from '../constants/baseConstants'
import type { AppThunk, RootState } from './store'
import { GoogleLabel } from './storeTypes/labelsTypes'
import { IBaseState } from './storeTypes/baseTypes'
import multipleIncludes from '../utils/multipleIncludes'
import findSettings from '../utils/Settings/findSettings'
import parseSettings from '../utils/Settings/parseSettings'
import createSettingsLabel from '../utils/Settings/createSettingsLabel'

const initialState: IBaseState = Object.freeze({
  baseLoaded: false,
  profile: {
    emailAddress: '',
    messagesTotal: 0,
    threadsTotal: 0,
    historyId: '',
  },
  isAuthenticated: false,
})

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setBaseLoaded: (state, { payload }: { payload: boolean }) => {
      if (!state.baseLoaded) {
        state.baseLoaded = payload
      }
    },
    setIsAuthenticated: (state, { payload }: { payload: boolean }) => {
      state.isAuthenticated = payload
    },
    setProfile: (state, { payload }) => {
      state.profile = payload
    },
  },
})

export const { setBaseLoaded, setIsAuthenticated, setProfile } =
  baseSlice.actions

export const handleSettings =
  (labels: GoogleLabel[]): AppThunk =>
  async (dispatch) => {
    const settingsLabel = findSettings(labels)
    if (settingsLabel.length === 0) {
      createSettingsLabel({ dispatch })
      return
    }
    dispatch(setSettingsLabelId(settingsLabel[0].id))
    parseSettings(dispatch, settingsLabel)
  }

// The base can only be set to be loaded whenever all the labels are created.
export const recheckBase = (): AppThunk => async (dispatch, getState) => {
  if (
    getState().labels.storageLabels.length === BASE_ARRAY.length &&
    !getState().base.baseLoaded
  ) {
    dispatch(setBaseLoaded(true))
  }
}

export const checkBase = (): AppThunk => async (dispatch) => {
  try {
    // TODO: TYPE THE DATA
    const userResponse = await userApi().fetchUser()
    const { data, status } = userResponse
    const labelResponse = await labelApi().fetchLabels()
    const { labels } = labelResponse
    if (data && status === 200) {
      dispatch(setProfile(data))
      if (Array.isArray(labels) && labels.length > 0) {
        const nameMapLabels = labels.map((label: GoogleLabel) => label.name)
        if (!multipleIncludes(BASE_ARRAY, nameMapLabels)) {
          const checkArray = BASE_ARRAY.map((item) =>
            nameMapLabels.includes(item)
          )
          checkArray.forEach(
            (checkValue, index) =>
              !checkValue && dispatch(createLabel(BASE_ARRAY[index]))
          )

          const prefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
            labels.filter((item: GoogleLabel) => item.name === baseLabel)
          ).filter((result) => result.length > 0)
          dispatch(setStorageLabels(prefetchedBoxes))
          dispatch(handleSettings(labels))
        } else {
          const prefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
            labels.filter((item: GoogleLabel) => item.name === baseLabel)
          )

          dispatch(setStorageLabels(prefetchedBoxes))
          dispatch(setBaseLoaded(true))
          dispatch(handleSettings(labels))
        }
      } else {
        dispatch(
          setServiceUnavailable(
            `Network Error. ${labelResponse}. Please try again later.`
          )
        )
      }
    } else {
      dispatch(
        setServiceUnavailable(
          `Network Error. ${userResponse}. Please try again later.`
        )
      )
    }
  } catch (err) {
    dispatch(setServiceUnavailable('An error occured during loading the base.'))
  }
}

export const selectBaseLoaded = (state: RootState) => state.base.baseLoaded
export const selectIsAuthenticated = (state: RootState) =>
  state.base.isAuthenticated
export const selectProfile = (state: RootState) => state.base.profile

export default baseSlice.reducer
