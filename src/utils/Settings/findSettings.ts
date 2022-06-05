import {
  SETTINGS_DELIMITER,
  SETTINGS_LABEL,
} from '../../constants/baseConstants'
import { GoogleLabel } from '../../Store/storeTypes/labelsTypes'

const findSettings = (labels: GoogleLabel[]) =>
  labels.filter((label) =>
    label.name.includes(`${SETTINGS_LABEL + SETTINGS_DELIMITER}`)
  )

export default findSettings
