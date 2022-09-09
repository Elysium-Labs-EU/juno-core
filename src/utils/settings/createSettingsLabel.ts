import {
  SETTINGS_LABEL,
  SETTINGS_DELIMITER,
  showAvatarKeyMap,
  fetchSizeKeyMap,
  showIntroductionKeyMap,
  flexibleFlowKeyMap,
  alternateActionsMap,
} from '../../constants/baseConstants'
import { createLabel } from '../../store/labelsSlice'
import { AppDispatch } from '../../store/store'
import { ISettingsObject } from './settingsTypes'
import { buildLabelString } from './updateSettingsLabel'

/**
 * @function createSettingsLabel
 * @param dispatch - takes in a callback function to store the result of the function to the Redux store.
 * @param presetValues - an optional parameter, the parameter is in the format of an label.
 * Creates a settings label to be stored as a label inside Gmail.
 * @returns {void}
 */
export default function createSettingsLabel(
  dispatch: AppDispatch,
  presetValues?: ISettingsObject
): void {
  if (!presetValues) {
    // If there are no presetValues, create a default settings label
    dispatch(
      createLabel(
        `${
          SETTINGS_LABEL +
          SETTINGS_DELIMITER +
          showAvatarKeyMap.true +
          SETTINGS_DELIMITER +
          fetchSizeKeyMap[20] +
          SETTINGS_DELIMITER +
          showIntroductionKeyMap.true +
          SETTINGS_DELIMITER +
          flexibleFlowKeyMap.false +
          SETTINGS_DELIMITER +
          alternateActionsMap.true
        }`
      )
    )
  } else {
    // If there are presetValues, create an updated settings label whilst maintaining the user's settings
    dispatch(createLabel(buildLabelString(presetValues)))
  }
}
