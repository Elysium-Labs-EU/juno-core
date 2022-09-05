/* eslint-disable no-restricted-syntax */
import {
  AVAILABLE_SETTINGS,
  fetchSizeMap,
  flexibleFlowMap,
  SETTINGS_DELIMITER,
  showAvatarMap,
  showIntroductionMap,
} from '../../constants/baseConstants'
import { setSettings } from '../../store/utilsSlice'
import * as global from '../../constants/globalConstants'
import { GoogleLabel } from '../../store/storeTypes/labelsTypes'
import { AppDispatch } from '../../store/store'
import fixMissingSetting from './fixMissingSetting'
import createSettingsLabel from './createSettingsLabel'

/**
 * @function parseSettings
 * @param dispatch - takes in a function that dispatches an action to the Redux store
 * @param settingsLabel - takes in the found label from Google, which holds all the settings
 * The function will attempt to parse the label and set the system settings according the results.
 * The found label will be store to the localStorage for later reference.
 * @returns {void}
 */

export default function parseSettings(
  dispatch: AppDispatch,
  settingsLabel: GoogleLabel
): void {
  const parsedSettings = settingsLabel.name.split(SETTINGS_DELIMITER)
  if (parsedSettings && parsedSettings.length > 0) {
    // Remove the prefix of 'Juno/' from the parsed result
    parsedSettings.shift()
    const baseSettings = AVAILABLE_SETTINGS
    const foundSettings: any = {}
    for (const value of Object.values(parsedSettings)) {
      switch (value) {
        case 'SA0':
        case 'SA1':
          foundSettings.isAvatarVisible = showAvatarMap[value]
          baseSettings.filter((item) => item !== 'avatar')
          break
        case 'FS20':
        case 'FS25':
        case 'FS30':
          foundSettings.emailFetchSize = fetchSizeMap[value]
          break
        case 'FF0':
        case 'FF1':
          foundSettings.isFlexibleFlowActive = flexibleFlowMap[value]
          break
        case 'SI0':
        case 'SI1':
          foundSettings.showIntroduction = showIntroductionMap[value]
          break
        default:
          // No default option needed, if there is a missing settings function.
          break
      }
    }
    const missingSettings = baseSettings.filter(
      (item) => !Object.keys(foundSettings).includes(item)
    )
    if (missingSettings.length > 0) {
      const fixedResult = fixMissingSetting(missingSettings)
      // Patch the foundSettings with the fixed settings and update the settings label on Gmail with the fixed settings.
      const completeSettings = Object.assign(foundSettings, fixedResult)
      createSettingsLabel(dispatch, completeSettings)
    }

    localStorage.setItem(
      global.JUNO_SETTINGS_LOCAL,
      JSON.stringify(foundSettings)
    )
    dispatch(setSettings(foundSettings))
  }
}
