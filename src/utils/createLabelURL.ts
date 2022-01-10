import convertArrayToString from './convertArrayToString'
import * as global from '../constants/globalConstants'

const labelURL = (labelIds: string[]) => {
  if (labelIds && labelIds.length > 0) {
    return convertArrayToString(
      labelIds.filter((label) => label !== global.UNREAD_LABEL)
    )
  }
  return null
}

export default labelURL
