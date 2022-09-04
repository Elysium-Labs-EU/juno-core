import {
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

/**
 * @function parseSettings
 * @param dispatch - takes in a function that dispatches an action to the Redux store
 * @param settingsLabel - takes in the found label from Google, which holds all the settings
 * The function will attempt to parse the label and set the system settings according the results.
 * The found label will be store to the localStorage for later reference.
 * @returns {void}
 */

// TODO: If the setting is undefined, set it to a default

export default function parseSettings(
  dispatch: AppDispatch,
  settingsLabel: GoogleLabel[]
): void {
  const parsedSettings = settingsLabel[0].name.split(SETTINGS_DELIMITER)
  const foundSettings: any = {}
  parsedSettings.forEach((setting) => {
    if (showAvatarMap[setting] !== undefined) {
      foundSettings.isAvatarVisible = showAvatarMap[setting]
    }
    if (fetchSizeMap[setting] !== undefined) {
      foundSettings.emailFetchSize = fetchSizeMap[setting]
    }
    if (showIntroductionMap[setting] !== undefined) {
      foundSettings.showIntroduction = showIntroductionMap[setting]
    }
    if (flexibleFlowMap[setting] !== undefined) {
      foundSettings.isFlexibleFlowActive = flexibleFlowMap[setting]
    }
  })
  localStorage.setItem(
    global.JUNO_SETTINGS_LOCAL,
    JSON.stringify(foundSettings)
  )
  dispatch(setSettings(foundSettings))
}
