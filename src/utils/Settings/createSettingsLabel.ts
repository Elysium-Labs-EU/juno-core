import {
  SETTINGS_LABEL,
  SETTINGS_DELIMITER,
  showAvatarKeyMap,
  fetchSizeKeyMap,
  showIntroductionKeyMap,
} from '../../constants/baseConstants'
import { createLabel } from '../../store/labelsSlice'
import { AppDispatch } from '../../store/store'

/**
 * @function createSettingsLabel
 * @param dispatch - takes in a callback function to store the result of the function to the Redux store.
 * Creates a settings label to be stored as a label inside GMail.
 * @returns {void}
 */
const createSettingsLabel = (dispatch: AppDispatch): void =>
  dispatch(
    createLabel(
      `${
        SETTINGS_LABEL +
        SETTINGS_DELIMITER +
        showAvatarKeyMap.true +
        SETTINGS_DELIMITER +
        fetchSizeKeyMap[20] +
        SETTINGS_DELIMITER +
        showIntroductionKeyMap.true
      }`
    )
  )

export default createSettingsLabel
