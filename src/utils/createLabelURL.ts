import * as global from 'constants/globalConstants'
import convertArrayToString from 'utils/convertArrayToString'

const labelURL = (labelIds: string[]) => {
  if (labelIds && labelIds.length > 0) {
    return convertArrayToString(
      labelIds.filter((label) => label !== global.UNREAD_LABEL)
    )
  }
  return null
}

export default labelURL
