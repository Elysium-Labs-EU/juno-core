import {
  SETTINGS_DELIMITER,
  SETTINGS_LABEL,
} from 'constants/baseConstants'
import { removeLabel } from 'store/labelsSlice'
import type { AppDispatch } from 'store/store'
import type { IGoogleLabel } from 'store/storeTypes/labelsTypes'

/**
 * @function findSettings
 * @param labels - takes in the response of the Label list api from Gmail
 * @param dispatch
 * It will attempt to filter and parse the settings label, if there are multiple settings labels that are of equal size, we clear it out.
 * @returns null or a Google Label that is the settings label.
 */

const findSettings = (labels: Array<IGoogleLabel>, dispatch: AppDispatch) => {
  const result = labels.filter((label) =>
    label.name.includes(`${SETTINGS_LABEL + SETTINGS_DELIMITER}`)
  )

  if (result.length > 1) {
    const longestSettingsLabel = []
    const toRemoveLabels = []
    let longestSettingsLabelNumber = 0
    for (let i = 0; i < result.length; i += 1) {
      if (result[i].name.length > longestSettingsLabelNumber) {
        longestSettingsLabel.push(result[i])
        longestSettingsLabelNumber = result[i].name.length
      }
      if (result[i].name.length === longestSettingsLabelNumber) {
        toRemoveLabels.push(result[i])
      }
    }
    if (result.length !== toRemoveLabels.length) {
      if (toRemoveLabels.length > 0) {
        toRemoveLabels.forEach((label) => dispatch(removeLabel(label.id)))
      }
      if (longestSettingsLabel.length === 1) {
        return longestSettingsLabel[0]
      }
    } else {
      const uniqueLabels = [
        ...new Set(toRemoveLabels.concat(longestSettingsLabel)),
      ]
      // If there are two or more equal length settings labels found
      // we drop it all and create a new one via the 'handleSettings' function.
      uniqueLabels.forEach((label) => dispatch(removeLabel(label.id)))
      return null
    }
  }
  if (result.length === 1) {
    return result[0]
  }
  return null
}
export default findSettings
