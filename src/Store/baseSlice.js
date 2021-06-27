/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit'
import createApiClient from '../data/api'
import { multipleIncludes } from '../utils'
import { setServiceUnavailable } from './utilsSlice'
import { createLabel, setStorageLabels } from './labelsSlice'
import { loadEmails } from './metaListSlice'

const api = createApiClient()
const BASE_MAX_RESULTS = 20

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
  const BASE_ARRAY = [
    'Juno',
    'Juno/To Do',
    'Juno/Keep',
    'Juno/Reminder',
    'INBOX',
    'SPAM',
    // 'DRAFT',
    'SENT',
  ]
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
            console.log('You do not have all labels.')
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
            console.log('Gotcha! All minimal required labels.')
            dispatch(
              setStorageLabels(
                BASE_ARRAY.map((baseLabel) =>
                  labelArray.filter((item) => item.name === baseLabel)
                )
              )
            )
            const prefetchedBoxes = BASE_ARRAY.map((baseLabel) =>
              labelArray.filter((item) => item.name === baseLabel)
            )
            let count = 0
            const loadCount = prefetchedBoxes.length
            prefetchedBoxes.forEach(async (label) => {
              const params = {
                labelIds: [label[0].id],
                maxResults: BASE_MAX_RESULTS,
              }
              await dispatch(loadEmails(params))
              count += 1
              if (count === loadCount) {
                console.log(loadCount)
                console.log(count)
                dispatch(setBaseLoaded(true))
              }
            })
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
