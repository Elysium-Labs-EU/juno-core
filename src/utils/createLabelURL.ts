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
// const labelURL = (labelIds: string[]) => {
//   // Never use the UNREAD label, only if that is the only label available.
//   if (labelIds && labelIds.length > 0) {
//     const noUnreadLabel = labelIds.filter(
//       (label) => label !== global.UNREAD_LABEL
//     )
//     if (noUnreadLabel.length > 0) {
//       return convertArrayToString(noUnreadLabel)
//     }
//     if (labelIds.length === 1 && labelIds.includes(global.UNREAD_LABEL)) {
//       return convertArrayToString(labelIds)
//     }
//   }
//   return null
// }

export default labelURL
