import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { BASE_ARRAY } from 'constants/baseConstants'
import { ARCHIVE_LABEL } from 'constants/globalConstants'
import labelApi from 'data/labelApi'
import settingsApi from 'data/settingsApi'
import userApi from 'data/userApi'
import { setBaseEmailList } from 'store/emailListSlice'
import { createLabel, setStorageLabels } from 'store/labelsSlice'
import type { AppThunk, RootState } from 'store/store'
import type { IBaseState, TPrefetchedBoxes } from 'store/storeTypes/baseTypes'
import type { IGoogleLabel } from 'store/storeTypes/labelsTypes'
import { setSettingsLabelId, setSystemStatusUpdate } from 'store/utilsSlice'
import multipleIncludes from 'utils/multipleIncludes'
import createSettingsLabel from 'utils/settings/createSettingsLabel'
import findSettings from 'utils/settings/findSettings'
import parseSettings from 'utils/settings/parseSettings'

import { IEmailListObject, TBaseEmailList } from './storeTypes/emailListTypes'

/* eslint-disable no-param-reassign */

const initialState: IBaseState = Object.freeze({
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

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setBaseLoaded: (
      state,
      { payload }: PayloadAction<Pick<IBaseState, 'baseLoaded'>['baseLoaded']>
    ) => {
      if (!state.baseLoaded) {
        state.baseLoaded = payload
      }
    },
    setIsAuthenticated: (
      state,
      {
        payload,
      }: PayloadAction<Pick<IBaseState, 'isAuthenticated'>['isAuthenticated']>
    ) => {
      state.isAuthenticated = payload
    },
    setProfile: (
      state,
      { payload }: PayloadAction<Pick<IBaseState, 'profile'>['profile']>
    ) => {
      state.profile = payload
    },
  },
})

export const { setBaseLoaded, setIsAuthenticated, setProfile } =
  baseSlice.actions

export const handleSettings =
  (labels: IGoogleLabel[]): AppThunk =>
  async (dispatch) => {
    const settingsLabel = findSettings(labels, dispatch)
    if (!settingsLabel) {
      createSettingsLabel(dispatch)
      return
    }
    dispatch(setSettingsLabelId(settingsLabel.id))
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
      const [firstEmailContainer] = emailContainer
      if (firstEmailContainer) {
        const presetEmailBox = {
          labels: [firstEmailContainer?.id],
          threads: [] as [],
          nextPageToken: null,
        }
        emailListBuffer.push(presetEmailBox)
      }
    })

    dispatch(setBaseEmailList(emailListBuffer))
  }

/**
 * @function finalizeBaseLoading
 * @param labels
 * @returns finalizes the base loading by setting the emaillist and the storagelabels in Redux and parsing the settings.
 */

const finalizeBaseLoading =
  (labels: Array<IGoogleLabel>): AppThunk =>
  (dispatch) => {
    // TODO: Refactor this to not be an array of arrays, but an array of objects
    const prefetchedBoxes: TPrefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
      labels.filter((item) => item.name === baseLabel)
    )
    // Add an empty label to have the option to show ALL emails.
    const addEmptyAllLabel = prefetchedBoxes.concat([
      [
        {
          id: ARCHIVE_LABEL,
          name: ARCHIVE_LABEL,
          messageListVisibility: 'show',
          labelListVisibility: 'labelShow',
          type: 'junoCustom',
        },
      ],
    ])
    dispatch(presetEmailList(addEmptyAllLabel))
    dispatch(setStorageLabels(addEmptyAllLabel))
    dispatch(handleSettings(labels))
    dispatch(setBaseLoaded(true))
  }

export const checkBase = (): AppThunk => async (dispatch) => {
  try {
    // TODO: TYPE THE DATA
    const userResponse = await userApi().fetchUser()
    const sendAsResponse = await settingsApi().getSendAs(
      userResponse.data.emailAddress
    )
    const labelResponse = await labelApi().fetchLabels()
    const { labels } = labelResponse
    if (userResponse?.data && userResponse?.status === 200) {
      if (sendAsResponse?.data && sendAsResponse?.status === 200) {
        dispatch(
          setProfile({
            signature: sendAsResponse?.data?.signature ?? '',
            ...userResponse.data,
          })
        )
        if (Array.isArray(labels) && labels.length > 0) {
          // TODO: Check when this is triggered and write an explanation
          const nameMapLabels = labels.map((label: IGoogleLabel) => label.name)
          if (!multipleIncludes(BASE_ARRAY, nameMapLabels)) {
            const checkArray = BASE_ARRAY.map((item) =>
              nameMapLabels.includes(item)
            )
            checkArray.forEach((checkValue, index) => {
              const baseArrayItem = BASE_ARRAY[index]
              if (!checkValue && baseArrayItem)
                dispatch(createLabel(baseArrayItem))
            })

            dispatch(finalizeBaseLoading(labels))
          } else {
            dispatch(finalizeBaseLoading(labels))
          }
        } else {
          dispatch(
            setSystemStatusUpdate({
              type: 'error',
              message: `Network Error. ${labelResponse}. Please try again later.`,
            })
          )
        }
      } else {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: `Network Error. ${sendAsResponse}. Please try again later.`,
          })
        )
      }
    } else {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: `Network Error. ${userResponse}. Please try again later.`,
        })
      )
    }
  } catch (err) {
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
