import {
  SETTINGS_LABEL,
  SETTINGS_DELIMITER,
  showAvatarKeyMap,
  fetchSizeKeyMap,
  showIntroductionKeyMap,
} from '../../constants/baseConstants'
import { createLabel } from '../../Store/labelsSlice'

const createSettingsLabel = ({ dispatch }: { dispatch: Function }) =>
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
