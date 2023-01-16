import { createSlice } from '@reduxjs/toolkit'

import findSettings from '../findSettings'

const removeLabel = (labelId: string) => ({
  type: 'REMOVE_LABEL',
  labelId,
})

const mySlice = createSlice({
  name: 'mySlice',
  initialState: {
    labels: [],
  },
  reducers: {
    removeLabel: (state, action) => {
      state.labels = state.labels.filter((label) => label.id !== action.payload)
    },
  },
})

const store = createStore(mySlice.reducer)

describe('findSettings', () => {
  it('returns the longest matching label when multiple labels match', () => {
    store.dispatch(
      mySlice.actions.removeLabel({
        payload: {
          labels: [
            { id: '1', name: 'settings_test_1' },
            { id: '2', name: 'settings_test_2' },
            { id: '3', name: 'settings_test_3_longer' },
          ],
        },
      })
    )
    const result = findSettings(store.getState().labels, (labelId: string) =>
      store.dispatch(removeLabel(labelId))
    )
    expect(result).toEqual({ id: '3', name: 'settings_test_3_longer' })
  })

  it('returns null when no matching label is found', () => {
    store.dispatch(
      mySlice.actions.removeLabel({
        payload: {
          labels: [
            { id: '1', name: 'not_a_settings_label' },
            { id: '2', name: 'also_not_a_settings_label' },
          ],
        },
      })
    )
    const result = findSettings(store.getState().labels, (labelId: string) =>
      store.dispatch(removeLabel(labelId))
    )
    expect(result).toBe(null)
  })

  it('returns the matching label when only one label matches', () => {
    store.dispatch(
      mySlice.actions.removeLabel({
        payload: {
          labels: [
            { id: '1', name: 'settings_test' },
            { id: '2', name: 'not_a_settings_label' },
          ],
        },
      })
    )
    const result = findSettings(store.getState().labels, (labelId: string) =>
      store.dispatch(removeLabel(labelId))
    )
    expect(result).toEqual({ id: '1', name: 'settings_test' })
  })
})
