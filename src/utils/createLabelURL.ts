import convertArrayToString from './convertArrayToString'

const labelURL = (labelIds: string[]) => {
  if (labelIds && labelIds.length > 0) {
    return convertArrayToString(labelIds)
  }
  return null
}

export default labelURL
