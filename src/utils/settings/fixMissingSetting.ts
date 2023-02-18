/* eslint-disable no-restricted-syntax */
import {
  showAvatarMap,
  emailFetchSizeMap,
  flexibleFlowMap,
  showIntroductionMap,
  alternateActionsMap,
} from 'constants/baseConstants'

export const settingMap = {
  isAvatarVisible: showAvatarMap.SA1,
  emailFetchSize: emailFetchSizeMap.FS20,
  isFlexibleFlowActive: flexibleFlowMap.FF1,
  showIntroduction: showIntroductionMap.SI1,
  alternateActions: alternateActionsMap.AA1,
}

export default function fixMissingSetting(missingSettings: Array<string>) {
  const fixedSettings: any = {}
  const unableToHandle: Array<string> = []
  for (const value of missingSettings) {
    if (settingMap[value as keyof typeof settingMap]) {
      fixedSettings[value] = settingMap[value as keyof typeof settingMap]
    } else {
      unableToHandle.push(value)
    }
  }
  // In case the above loop errors, show this in the console
  if (unableToHandle.length > 0) {
    console.error(unableToHandle)
  }
  return fixedSettings
}
