import { expect } from 'vitest'

// import {
//   SETTINGS_LABEL,
//   SETTINGS_DELIMITER,
//   showAvatarKeyMap,
//   emailFetchSizeKeyMap,
//   showIntroductionKeyMap,
//   flexibleFlowKeyMap,
//   alternateActionsKeyMap,
// } from 'constants/baseConstants'
// import { createLabel } from 'store/labelsSlice'

import createSettingsLabel from '../createSettingsLabel'
// import { buildLabelString } from '../updateSettingsLabel'

describe('createSettingsLabel', () => {
  const dispatchMock = vitest.fn()
  // let presetValues: any
  // beforeEach(() => {
  // dispatchMock = vitest.fn()
  //   presetValues = {
  //     showAvatar: true,
  //     emailFetchSize: 20,
  //     showIntroduction: true,
  //     flexibleFlow: false,
  //     alternateActions: true,
  //   }
  // })

  it('should call dispatch function when no presetValues are provided', () => {
    createSettingsLabel(dispatchMock)
    expect(dispatchMock.mock.calls.length).toBe(1)
  })

  // it('should call dispatch function with correct default label when no presetValues are provided', async () => {
  //   const expectedThunkAction = createLabel(
  //     `${
  //       SETTINGS_LABEL +
  //       SETTINGS_DELIMITER +
  //       showAvatarKeyMap.true +
  //       SETTINGS_DELIMITER +
  //       emailFetchSizeKeyMap[20] +
  //       SETTINGS_DELIMITER +
  //       showIntroductionKeyMap.true +
  //       SETTINGS_DELIMITER +
  //       flexibleFlowKeyMap.false +
  //       SETTINGS_DELIMITER +
  //       alternateActionsKeyMap.true
  //     }`
  //   )
  //   createSettingsLabel(dispatchMock)
  //   expect(dispatchMock).toHaveBeenCalledWith(expectedThunkAction)
  // })

  // it('should call dispatch function with correct label when presetValues are provided', () => {
  //   createSettingsLabel(dispatchMock, presetValues)
  //   expect(dispatchMock.mock.calls[0][0]).toEqual(
  //     createLabel(buildLabelString(presetValues))
  //   )
  // })
})
