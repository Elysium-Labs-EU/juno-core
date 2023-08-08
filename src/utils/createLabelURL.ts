import * as global from 'constants/globalConstants'
import convertArrayToString from 'utils/convertArrayToString'

const labelURL = (labelIds: Array<string>) => {
  if (labelIds.length === 0) {
    return null
  }
  return convertArrayToString(
    labelIds.filter((label) => label !== global.UNREAD_LABEL)
  )

}

export default labelURL
