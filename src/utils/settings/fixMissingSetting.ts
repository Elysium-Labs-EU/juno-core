/* eslint-disable no-restricted-syntax */
import {
  showAvatarMap,
  fetchSizeMap,
  flexibleFlowMap,
  showIntroductionMap,
  alternateActionsMap,
} from '../../constants/baseConstants'

export default function fixMissingSetting(missingSettings: string[]) {
  const fixedSettings: any = {}
  const unableToHandle: string[] = []
  for (const value of Object.values(missingSettings)) {
    switch (value) {
      case 'isAvatarVisible':
        fixedSettings.isAvatarVisible = showAvatarMap.SA1
        break
      case 'emailFetchSize':
        fixedSettings.emailFetchSize = fetchSizeMap.FS20
        break
      case 'isFlexibleFlowActive':
        fixedSettings.isFlexibleFlowActive = flexibleFlowMap.FF1
        break
      case 'showIntroduction':
        fixedSettings.showIntroduction = showIntroductionMap.SI1
        break
      case 'alternateActions':
        fixedSettings.alternateActions = alternateActionsMap.AA1
        break
      default:
        unableToHandle.push(value)
    }
  }
  // In case the above loop errors, show this in the console
  if (unableToHandle.length > 0) {
    console.error(unableToHandle)
  }
  return fixedSettings
}
