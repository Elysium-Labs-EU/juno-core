/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import labelApi from '../data/labelApi'
import userApi from '../data/userApi'
import { multipleIncludes } from '../utils'
import { setServiceUnavailable } from './utilsSlice'
import { createLabel, setStorageLabels } from './labelsSlice'
import { BASE_ARRAY } from '../constants/baseConstants'
import type { AppThunk, RootState } from './store'
import { GoogleLabel } from './labelsTypes'

// interface Profile {
//   n
// }
// ToDo: Set Profile interface

interface BaseState {
  baseLoaded: boolean
  profile: any
}

const initialState: BaseState = Object.freeze({
  baseLoaded: false,
  profile: {},
})

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setBaseLoaded: (state, action) => {
      if (!state.baseLoaded) {
        state.baseLoaded = action.payload
      }
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
  },
})

export const { setBaseLoaded, setProfile } = baseSlice.actions

export const checkBase = (): AppThunk => async (dispatch) => {
  try {
    const user = await userApi().fetchUser()
    const labels = await labelApi().fetchLabel()
    if (labels && user && user.status === 200) {
      dispatch(setProfile(user.data.data))
      if (labels.message.labels.length > 0) {
        const labelArray = labels.message.labels
        if (
          !multipleIncludes(
            BASE_ARRAY,
            labelArray.map((item: GoogleLabel) => item.name)
          )
        ) {
          BASE_ARRAY.map((item) =>
            labelArray.map((label: any) => label.name).includes(item)
          ).map(
            (checkValue, index) =>
              !checkValue && dispatch(createLabel(BASE_ARRAY[index]))
          )
          dispatch(setBaseLoaded(true))
          // What happends if the label is removed from gmail, but the emails still exist. The label
          // is recreated. Does it still attempt to load the base?
        } else {
          const prefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
            labelArray.filter((item: GoogleLabel) => item.name === baseLabel)
          )
          dispatch(setStorageLabels(prefetchedBoxes))
          dispatch(setBaseLoaded(true))
        }
      } else {
        dispatch(setServiceUnavailable('Network Error. Please try again later'))
      }
    } else {
      dispatch(setServiceUnavailable('Network Error. Please try again later'))
    }
  } catch (err) {
    console.log(err)
    dispatch(setServiceUnavailable('An error occured during loading the base.'))
  }
}

export const selectBaseLoaded = (state: RootState) => state.base.baseLoaded
export const selectProfile = (state: RootState) => state.base.profile

export default baseSlice.reducer
