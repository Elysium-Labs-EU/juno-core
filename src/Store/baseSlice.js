/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import labelApi from '../data/labelApi'
import userApi from '../data/userApi'
import { multipleIncludes } from '../utils'
import { setServiceUnavailable } from './utilsSlice'
import { createLabel, setStorageLabels } from './labelsSlice'
import { BASE_ARRAY } from '../constants/baseConstants'
import { NETWORK_ERROR } from '../constants/globalConstants'

const initialState = Object.freeze({
  baseLoaded: false,
  profile: {},
  isAuthenticated: false,
})

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    resetBase: () => {
      return initialState
    },
    setBaseLoaded: (state, action) => {
      if (!state.baseLoaded) {
        state.baseLoaded = action.payload
      }
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const { resetBase, setBaseLoaded, setProfile, setIsAuthenticated } =
  baseSlice.actions

// export const userSignin = () => {

// }

export const checkBase = () => {
  return async (dispatch) => {
    try {
      const user = await userApi().fetchUser()
      const labels = await labelApi().fetchLabel()
      if (labels && user.status === 200) {
        dispatch(setProfile(user.data.data))
        if (labels.message.labels.length > 0) {
          const labelArray = labels.message.labels
          if (
            !multipleIncludes(
              BASE_ARRAY,
              labelArray.map((item) => item.name)
            )
          ) {
            BASE_ARRAY.map((item) =>
              labelArray.map((label) => label.name).includes(item)
            ).map(
              (checkValue, index) =>
                !checkValue && dispatch(createLabel(BASE_ARRAY[index]))
            )
            dispatch(setBaseLoaded(true))
            // What happends if the label is removed from gmail, but the emails still exist. The label
            // is recreated. Does it still attempt to load the base?
          } else {
            const prefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
              labelArray.filter((item) => item.name === baseLabel)
            )
            dispatch(setStorageLabels(prefetchedBoxes))
            dispatch(setBaseLoaded(true))
          }
        } else {
          dispatch(setServiceUnavailable(NETWORK_ERROR))
        }
      } else {
        dispatch(setServiceUnavailable(NETWORK_ERROR))
      }
    } catch (err) {
      process.env.NODE_ENV === 'development' && console.error(err)
      dispatch(setServiceUnavailable(NETWORK_ERROR))
    }
  }
}

export const selectBaseLoaded = (state) => state.base.baseLoaded
export const selectProfile = (state) => state.base.profile
export const selectIsAuthenticated = (state) => state.base.isAuthenticated

export default baseSlice.reducer
