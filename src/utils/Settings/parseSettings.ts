import {
  fetchSizeMap,
  SETTINGS_DELIMITER,
  showAvatarMap,
  showIntroductionMap,
} from '../../constants/baseConstants'
import { setSettings } from '../../Store/utilsSlice'
import * as global from '../../constants/globalConstants'
import { GoogleLabel } from '../../Store/storeTypes/labelsTypes'

const parseSettings = (dispatch: Function, settingsLabel: GoogleLabel[]) => {
  const parsedSettings = settingsLabel[0].name.split(SETTINGS_DELIMITER)
  const foundSettings: any = {}
  for (let i = 0; i < parsedSettings.length; i += 1) {
    if (showAvatarMap[parsedSettings[i]] !== undefined) {
      foundSettings.isAvatarVisible = showAvatarMap[parsedSettings[i]]
    }
    if (fetchSizeMap[parsedSettings[i]] !== undefined) {
      foundSettings.emailFetchSize = fetchSizeMap[parsedSettings[i]]
    }
    if (showIntroductionMap[parsedSettings[i]] !== undefined) {
      foundSettings.showIntroduction = showIntroductionMap[parsedSettings[i]]
    }
  }
  localStorage.setItem(
    global.JUNO_SETTINGS_LOCAL,
    JSON.stringify(foundSettings)
  )
  dispatch(setSettings(foundSettings))
}

export default parseSettings
