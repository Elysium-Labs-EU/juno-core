import { expect } from 'vitest'

import { store } from 'store/store'

import findSettings from '../findSettings'

describe('findSettings', () => {
  it('returns the longest matching label when multiple labels match', () => {
    const labels = [
      { id: '1', name: 'Juno/#settings_test_1', type: 'user' },
      { id: '2', name: 'Juno/#settings_test_2', type: 'user' },
      { id: '3', name: 'Juno/#settings_test_3_longer', type: 'user' },
    ]
    const result = findSettings(labels, store.dispatch)
    expect(result).toEqual({
      id: '3',
      name: 'Juno/#settings_test_3_longer',
      type: 'user',
    })
  })

  it('returns null when no matching label is found', () => {
    const labels = [{ id: '1', name: 'not_a_settings_label', type: 'user' }]
    const result = findSettings(labels, store.dispatch)
    expect(result).toEqual(null)
  })

  it('returns the matching label when only one label matches', () => {
    const labels = [
      { id: '1', name: 'Juno/#settings_test_1', type: 'user' },
      { id: '2', name: 'not_a_settings_label', type: 'user' },
      { id: '3', name: 'not_a_settings_label_1', type: 'user' },
    ]
    const result = findSettings(labels, store.dispatch)
    expect(result).toEqual({
      id: '1',
      name: 'Juno/#settings_test_1',
      type: 'user',
    })
  })
})
