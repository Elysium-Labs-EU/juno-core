import { expect } from 'vitest'

import { JUNO_SETTINGS_LOCAL } from 'constants/globalConstants'

import { parseSettingsLabel } from '../updateSettingsLabel'

describe('parseSettingsLabel', () => {
  const foundSettings = {
    emailFetchSize: 'FS20',
    showIntroduction: 'SI0',
    isAvatarVisible: 'SA1',
    isFlexibleFlowActive: 'FF1',
    alternateActions: 'AA1',
  }
  localStorage.setItem(JUNO_SETTINGS_LOCAL, JSON.stringify(foundSettings))

  const settingsLabelId = 'label1234'
  const newSettings = {
    emailFetchSize: 'FS25',
    showIntroduction: 'SI1',
    isAvatarVisible: 'SA0',
    isFlexibleFlowActive: 'FF0',
    alternateActions: 'AA0',
  }
  const expectedString = 'Juno/#FS25#SI1#SA0#FF0#AA0'

  it('should parse the settings label and update it', () => {
    const result = parseSettingsLabel({ settingsLabelId, ...newSettings })
    expect(result).toEqual({
      settingsLabelId: 'label1234',
      updatedString: expectedString,
    })
  })
})
