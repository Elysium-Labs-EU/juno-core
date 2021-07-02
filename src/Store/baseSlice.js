/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit'
import labelApi from '../data/labelApi'
import { multipleIncludes } from '../utils'
import { setServiceUnavailable } from './utilsSlice'
import { createLabel, setStorageLabels } from './labelsSlice'
import { BASE_ARRAY } from '../constants/baseConstants'

const api = labelApi()

export const baseSlice = createSlice({
  name: 'base',
  initialState: {
    baseLoaded: false,
  },
  reducers: {
    setBaseLoaded: (state, action) => {
      if (!state.baseLoaded) {
        state.baseLoaded = action.payload
      }
    },
  },
})

export const { setBaseLoaded } = baseSlice.actions

export const checkBase = () => {
  return async (dispatch) => {
    try {
      const labels = await api.fetchLabel()
      if (labels) {
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
          dispatch(
            setServiceUnavailable('Network Error. Please try again later')
          )
        }
      } else {
        dispatch(setServiceUnavailable('Network Error. Please try again later'))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        setServiceUnavailable('An error occured during loading the base.')
      )
    }
  }
}

export const selectBaseLoaded = (state) => state.base.baseLoaded

export default baseSlice.reducer
