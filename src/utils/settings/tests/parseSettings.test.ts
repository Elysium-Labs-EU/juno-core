import { expect } from 'vitest'

// import { JUNO_SETTINGS_LOCAL } from 'constants/globalConstants'

import parseSettings from '../parseSettings'

describe('parseSettings', () => {
  const dispatch = vitest.fn()
  const settingsLabel = {
    name: 'Juno/#FS20#SI0#SA1#FF1#AA1',
    id: '1',
    type: 'user',
  }
  test('should parse the settings and dispatch the action', () => {
    parseSettings(dispatch, settingsLabel)
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        isAvatarVisible: true,
        emailFetchSize: 20,
        isFlexibleFlowActive: true,
        showIntroduction: false,
        alternateActions: true,
      },
      type: 'utils/setSettings',
    })
  })
  // test('should parse the settings and dispatch the action with missing settings fixed', () => {
  //   settingsLabel.name = 'Juno/#SA1'
  //   parseSettings(dispatch, settingsLabel)
  //   expect(dispatch).toHaveBeenCalledWith({
  //     payload: {
  //       isAvatarVisible: true,
  //       emailFetchSize: 20,
  //       isFlexibleFlowActive: false,
  //       showIntroduction: false,
  //       alternateActions: false,
  //     },
  //     type: 'utils/setSettings',
  //   })
  //   expect(localStorage.getItem(JUNO_SETTINGS_LOCAL)).toEqual(
  //     JSON.stringify({
  //       isAvatarVisible: true,
  //       emailFetchSize: 20,
  //       isFlexibleFlowActive: false,
  //       showIntroduction: false,
  //       alternateActions: false,
  //     })
  //   )
  // })
})
